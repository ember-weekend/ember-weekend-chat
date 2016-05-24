import Ember from 'ember';

export default Ember.Controller.extend({
  messages: Ember.computed.alias('model'),
  chat: Ember.inject.service('chat'),
  actions: {
    send() {
      const newMessage = this.get('message');
      this.set('message', '');
      this.get('chat').send(newMessage);
    }
  }
});
