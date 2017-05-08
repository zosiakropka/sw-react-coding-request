jest.mock('chart.js', () => class {});

import React from 'react';
import App from './App';
import { default as RepoFormComponent } from './github_repository/FormComponent';
import TabsComponent from './tabs/TabsComponent';
import TestUtils from 'react-dom/test-utils';
import CodeFrequencyComponent from './repo_stats/code_frequency/Component';
import PunchCardComponent from './repo_stats/punch_card/Component';
import CommitActivity from './repo_stats/commit_activity/Component';

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

  it('renders PunchCardComponent in a tab', () => {
    const tabsComponent = TestUtils.findRenderedComponentWithType(
      component,
      TabsComponent);

    expect(() => {
      TestUtils.findRenderedComponentWithType(
        tabsComponent,
        PunchCardComponent);
    }).not.toThrow();
  });

  it('renders CommitActivity in a tab', () => {
    const tabsComponent = TestUtils.findRenderedComponentWithType(
      component,
      TabsComponent);

    expect(() => {
      TestUtils.findRenderedComponentWithType(
        tabsComponent,
        CommitActivity);
    }).not.toThrow();
  });
});
