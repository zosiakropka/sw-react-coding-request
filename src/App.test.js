jest.mock('chart.js', () => class {});

import React from 'react';
import App from './App';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';
import TestUtils from 'react-dom/test-utils';
import { default as CodeFrequencyComponent } from './repo_stats/code_frequency/Component';

describe('App', () => {
  var component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<App />);
  });

  it('renders GitHub repo selection component', () => {

    expect(() => {
      TestUtils.findRenderedComponentWithType(component, RepoFormComponent);
    }).not.toThrow();
  });

  it('renders Tabs component', () => {
    expect(() => {
      TestUtils.findRenderedComponentWithType(component, TabsComponent);
    }).not.toThrow();
  });

  it('renders CodeFrequencyComponent in a tab', () => {
    const tabsComponent = TestUtils.findRenderedComponentWithType(
      component,
      TabsComponent);

    expect(() => {
      TestUtils.findRenderedComponentWithType(
        tabsComponent,
        CodeFrequencyComponent);
    }).not.toThrow();
  });
});
