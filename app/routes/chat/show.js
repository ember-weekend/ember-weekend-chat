import Ember from 'ember';

export default Ember.Route.extend({
  model({ room }) {
    return this.store.peekAll('message', { room });
  }
});
