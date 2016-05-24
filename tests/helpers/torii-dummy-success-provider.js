import Ember from 'ember';
import { faker} from 'ember-cli-mirage';

function generateCode() {
  return faker.internet.password(323, false, /[a-zA-Z0-9_-]/);
}

export default Ember.Object.extend({
  open: function(){
    return Ember.RSVP.Promise.resolve({
      authorizationCode: generateCode(),
      provider: 'github-oauth2'
    });
  }
});
