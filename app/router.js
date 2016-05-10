import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-in');
  this.authenticatedRoute('home', { path: '/' });
});

export default Router;
