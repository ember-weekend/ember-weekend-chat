import Ember from 'ember';
import config from '../config/environment';

const { RSVP, run, getOwner } = Ember;

function lookupProvider(container, providerName){
    return container.lookup('torii-provider:'+providerName);
}

export default Ember.Object.extend({
  open: function(authentication){
    const owner = getOwner(this);
    const provider = lookupProvider(owner, authentication.provider);
    const authorizationCode = authentication.authorizationCode;
    const state = provider.get('state');
    return new RSVP.Promise(function(resolve, reject){
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
    });
  }
});
