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
import ChartBuilder from './WeeklyChartBuilder';

it('builds a "bar" chart', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const chart = builder
    .setContext(canvas)
    .build();

  expect(chart).toBeInstanceOf(Chart);
  expect(chart.initData.type).toBe('bar');
});

it('maps "totals" to Y axis values', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const chart = builder
    .setContext(canvas)
    .setData([
      {
        'days': [1, 15, 11, 6, 14, 13, 6],
        'total': 66,
        'week': 1463875200
      },
      {
        'days': [10, 6, 6, 8, 13, 5, 5],
        'total': 53,
        'week': 1464480000
      }
    ])
    .build();

  expect(chart.initData.data.datasets[0].data)
    .toEqual([66, 53]);
});
