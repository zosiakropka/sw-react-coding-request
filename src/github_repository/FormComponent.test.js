import React from 'react';
import FormComponent from './FormComponent';
import mediator from './../Mediator';
import { shallow, mount } from 'enzyme';

describe('#render()', () => {
  it('renders a form', () => {
    const $form = shallow(<FormComponent />);
    expect($form.length).toBe(1);
    expect($form.is('form')).toBeTruthy();
    expect($form.hasClass('repository-form')).toBeTruthy();
  });

  it('renders repo URL input', () => {
    const $form = shallow(<FormComponent />);
    const $repoUrl = $form.find('.repository-form__repo-url');
    expect($repoUrl.length).toBe(1);
    expect($repoUrl.is('input[type="text"]')).toBeTruthy();
  });
});

describe('on form submit', () => {
  it('emits "github_repo:entered" if repoUrl is entered and valid', () => {
    const repoUrl = 'git@github.com:zosia/exercise.git';
    const $form = mount(<FormComponent />);
    const $repoUrl = $form.find('.repository-form__repo-url');
    spyOn(mediator, 'emit');

    $repoUrl.get(0).value = repoUrl;
    $form.simulate('change');

    expect(mediator.emit).toBeCalledWith(
      'github_repo:entered', {repoUrl: repoUrl});
  });

  it('emits "github_repo:entered" if repoUrl is entered and not valid', () => {
    const invalidRepoUrl = 'not-a-valid-github-repo-url';
    const $form = mount(<FormComponent />);
    const $repoUrl = $form.find('.repository-form__repo-url');
    spyOn(mediator, 'emit');

    $repoUrl.get(0).value = invalidRepoUrl;
    $form.simulate('change');

    expect(mediator.emit).toBeCalledWith(
      'github_repo:entered', {repoUrl: invalidRepoUrl});
  });

  it('emits "github_repo:entered" if repoUrl is empty', () => {
    const $form = mount(<FormComponent />);
    const $repoUrl = $form.find('.repository-form__repo-url');
    spyOn(mediator, 'emit');

    $repoUrl.get(0).value = '';
    $form.simulate('change');

    expect(mediator.emit).toBeCalledWith(
      'github_repo:entered', {repoUrl: ''});
  });
});
