import Ember from 'ember';
import PhoenixSocket from 'phoenix/services/phoenix-socket';
const { get } = Ember;

export default PhoenixSocket.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  token: Ember.computed.alias('currentUser.sessions.firstObject.token'),
  channel: null,
  subscribe(room) {
    const channel = this.joinChannel(`rooms:${room}`, {});
    channel.on("message", this.newMessage.bind(this));
    this.set('channel', channel);
  },
  newMessage(message) {
    get(this, 'store').pushPayload({
      data: {
        id: message.id,
        type: 'messages',
        attributes: {
          room: message.room,
          content: message.content,
          'created-at': message.inserted_at
        },
        relationships: {
          user: { data: { type: 'users', id: message.user_id } }
        }
      },
      included: [{
        id: message.user_id,
        type: 'users',
        attributes: {
          name: message.user_name,
          username: message.username
        },
      }]
    });
  },
  send(message) {
    console.log(message);
    this.get('channel').push("message", { content: message });
  },
  connect(url) {
    const token = get(this, 'token');
    this._super(url, { params: { token } });
  }
});
