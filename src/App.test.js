import React from 'react';
import App from './App';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';
import TestUtils from 'react-dom/test-utils';

it('renders GitHub repo selection component', () => {
  const component = TestUtils.renderIntoDocument(<App />);

  expect(() => {
    TestUtils.findRenderedComponentWithType(component, RepoFormComponent);
  }).not.toThrow();
});

it('renders Tabs component', () => {
  const component = TestUtils.renderIntoDocument(<App />);

  expect(() => {
    TestUtils.findRenderedComponentWithType(component, TabsComponent);
  }).not.toThrow();
});
