import Ember from 'ember';
import moment from 'moment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  createdAtWords: '',
  createdAtWordsTask: task(function *() {
    while(true) {
      const createdAtWords = moment(this.get('message.createdAt')).fromNow();
      this.set('createdAtWords', createdAtWords);
      yield timeout(300);
    }
  }).on('init')
});
