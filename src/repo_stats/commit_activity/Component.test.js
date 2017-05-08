jest.mock('../DataRefresher', () => {
  const callbacks = {};
  const fallbacks = {};
  const DataRefresher = class {
    constructor({statName}) {
      this._statName = statName;
      callbacks[statName] = callbacks[statName] || [];
      fallbacks[statName] = fallbacks[statName] || [];
    }

    onRefresh(callback) {
      callbacks[this._statName].push(callback);

      return this;
    }
    onError(fallback) {
      fallbacks[this._statName].push(fallback);

      return this;
    }
  };

  DataRefresher.hacks = {
    callOnRefresh: ({statName, data}) => {
      for (const callback of callbacks[statName]) {
        callback({data: data});
      }
    },
    callOnError: ({statName}) => {
      for (const fallback of fallbacks[statName]) {
        fallback();
      }
    }
  };

  return DataRefresher;
});

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import CommitActivityComponent from './Component';
import WeeklyChartBuilder from './WeeklyChartBuilder';
import ChartComponent from '../ChartComponent';
import DataRefresher from '../DataRefresher';

const component = TestUtils.renderIntoDocument(<CommitActivityComponent />);

it('renders ChartComponent', () => {
  expect(() => {
    TestUtils.findRenderedComponentWithType(component, ChartComponent);
  }).not.toThrow();
});

it('hides "ChartComponent" on refresh error', () => {
  DataRefresher.hacks.callOnError({statName: 'commit_activity'});

  const chartComponent = TestUtils.findRenderedComponentWithType(
    component,
    ChartComponent);
  const chartComponentProps = chartComponent.props;

  expect(chartComponentProps.data).toEqual(null);
  expect(chartComponentProps.ChartBuilder).toEqual(WeeklyChartBuilder);
});

it('rerenders "ChartComponent" on refresh success', () => {
  const chartData = {key: 'value'};
  DataRefresher.hacks.callOnRefresh({
    statName: 'commit_activity',
    data: chartData});

  const chartComponent = TestUtils.findRenderedComponentWithType(
    component,
    ChartComponent);
  const chartComponentProps = chartComponent.props;

  expect(chartComponentProps.data).toEqual(chartData);
  expect(chartComponentProps.ChartBuilder).toEqual(WeeklyChartBuilder);
});
