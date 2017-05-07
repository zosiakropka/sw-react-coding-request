jest.mock('chart.js', () => {
  const MockChart = class {
    constructor(ctx, initData) {
      this.ctx = ctx;
      this.initData = initData;
    }
  };

  return MockChart;
});

import Chart from 'chart.js';
import ChartBuilder from './ChartBuilder';

const WEDNESDAY_ID = 3;
const SATURDAY_ID = 6;

const MORNING_6 = 6;
const EVENING_3 = 15;

const COMMITS_WEDNESDAY_6AM = 0;
const COMMITS_WEDNESDAY_3PM = 2;
const COMMITS_SATURDAY_6AM = 4;
const COMMITS_SATURDAY_3PM = 16;

const EXAMPLE_VALID_DATA = [
  [WEDNESDAY_ID, MORNING_6, COMMITS_WEDNESDAY_6AM],
  [WEDNESDAY_ID, EVENING_3, COMMITS_WEDNESDAY_3PM],
  [SATURDAY_ID, MORNING_6, COMMITS_SATURDAY_6AM],
  [SATURDAY_ID, EVENING_3, COMMITS_SATURDAY_3PM]
];

const EXAMPLE_MAX_COMMITS_A_DAY = COMMITS_SATURDAY_3PM;

it('builds a "bubble" chart', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const chart = builder
    .setContext(canvas)
    .build();

  expect(chart).toBeInstanceOf(Chart);
  expect(chart.initData.type).toBe('bubble');
});

it('maps weekday to Y, hour to X, normalizes radius and hides 0 commits', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const data = EXAMPLE_VALID_DATA;

  const chart = builder
    .setContext(canvas)
    .setData(data)
    .build();

  const dataset = chart.initData.data.datasets[0];
  const MAX_SIZE = 20;

  expect(dataset.data)
    .toEqual([
      {
        x: EVENING_3,
        y: WEDNESDAY_ID,
        r: COMMITS_WEDNESDAY_3PM / EXAMPLE_MAX_COMMITS_A_DAY * MAX_SIZE,
        commits: COMMITS_WEDNESDAY_3PM
      },
      {
        x: MORNING_6,
        y: SATURDAY_ID,
        r: COMMITS_SATURDAY_6AM / EXAMPLE_MAX_COMMITS_A_DAY * MAX_SIZE,
        commits: COMMITS_SATURDAY_6AM
      },
      {
        x: EVENING_3,
        y: SATURDAY_ID,
        r: COMMITS_SATURDAY_3PM / EXAMPLE_MAX_COMMITS_A_DAY * MAX_SIZE,
        commits: COMMITS_SATURDAY_3PM
      }
    ]);
});
