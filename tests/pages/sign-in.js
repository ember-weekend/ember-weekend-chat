import PageObject from '../page-object';

let {
  visitable,
  isHidden,
  text,
  clickable
} = PageObject;

export default PageObject.create({
  visit: visitable('/sign-in'),
  noErrors: isHidden('.error'),
  error: text('.error'),
  signInWithGithub: clickable('#github')
});
