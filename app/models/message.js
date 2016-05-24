import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  room: attr(),
  user: belongsTo('user'),
  content: attr(),
  createdAt: attr('date')
});
