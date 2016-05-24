import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({
  chat: Ember.inject.service(),
  model({ room }) {
    const chat = get(this, 'chat');
    chat.connect();
    chat.subscribe(room);
    return this.store.peekAll('message');
  }
});
