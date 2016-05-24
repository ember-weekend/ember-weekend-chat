import Ember from 'ember';
import PhoenixSocket from 'phoenix/services/phoenix-socket';
const { get } = Ember;

export default PhoenixSocket.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  token: Ember.computed.alias('currentUser.sessions.firstObject.token'),
  subscribe(room) {
    const channel = this.joinChannel(`rooms:${room}`, {});
    channel.on("message", this.newMessage.bind(this));
  },
  newMessage(message) {
    console.log(message);
  },
  connect(url) {
    const token = get(this, 'token');
    this._super(url, { params: { token } });
  }
});
