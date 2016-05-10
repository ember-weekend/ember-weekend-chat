import Ember from 'ember';
import config from '../config/environment';

const { RSVP, run, getOwner } = Ember;

const sessionKey = 'ember-weekend-session';
const userKey = 'ember-weekend-user';

function lookupProvider(container, providerName){
  return container.lookup('torii-provider:'+providerName);
}

export default Ember.Object.extend({
  store: Ember.inject.service('store'),
  fetch() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const store = this.get('store');

      const userJson = localStorage.getItem(userKey);
      let user;
      if (userJson) {
        const userAttrs = JSON.parse(userJson);
        store.pushPayload(userAttrs);
        user = store.peekRecord('user', userAttrs.data.id);
      }

      const sessionJson = localStorage.getItem(sessionKey);
      let session;
      if (sessionJson) {
        const sesssionAttrs = JSON.parse(sessionJson);
        store.pushPayload(sesssionAttrs);
        session = store.peekRecord('session', sesssionAttrs.data.id);
      }

      if (!session) {
        reject('Not logged in');
      } else {
        resolve({ currentUser: user });
      }
    });
  },

  open(authentication) {
    const owner = getOwner(this);
    const provider = lookupProvider(owner, authentication.provider);
    const authorizationCode = authentication.authorizationCode;
    const state = provider.get('state');
    return new RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        method: 'post',
        url: `${config.apiUrl}/sessions`,
        data: JSON.stringify({
          data: {
            type: 'sessions',
            attributes: {
              provider: 'github', code: authorizationCode, state: state
            }
          }
        }),
        headers: {
          Accept : 'application/vnd.api+json',
          'Content-Type' : 'application/vnd.api+json',
        },
        success: run.bind(null, resolve),
        error: run.bind(null, reject)
      });
    }).then(userData => {
      const store = this.get('store');
      const { data: { id: sessionId } } = userData;
      const { included: [{ id: userId }] } = userData;
      store.pushPayload(userData);

      const session = store.peekRecord('session', sessionId);
      const sessionAttrs = session.serialize();
      sessionAttrs.data.id = session.get('id');
      localStorage.setItem(sessionKey, JSON.stringify(sessionAttrs));

      const currentUser = store.peekRecord('user', userId);
      const currentUserAttrs = currentUser.serialize();
      currentUserAttrs.data.id = currentUser.get('id');
      localStorage.setItem(userKey, JSON.stringify(currentUserAttrs));

      // This will get merged onto the session's currentUser property
      return { currentUser };
    });
  }
});
