import { test } from 'qunit';
import moduleForAcceptance from 'ember-weekend-admin/tests/helpers/module-for-acceptance';
import signIn from '../pages/sign-in';

moduleForAcceptance('Acceptance | user signs in');

test('visiting /sign-in', function(assert) {
  signIn.visit();

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
  });
});
