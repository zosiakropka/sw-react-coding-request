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

it('builds a "line" chart', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const chart = builder
    .setContext(canvas)
    .build();

  expect(chart).toBeInstanceOf(Chart);
  expect(chart.initData.type).toBe('line');
});

it('maps additions to dataset', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const data = [
    [1443126400, 128, -64],
    [1445731200, 256, -32],
    [1446336000, 512, -16]
  ];
  const chart = builder
    .setContext(canvas)
    .setData(data)
    .build();

  const dataset = chart.initData.data.datasets[0];
  expect(dataset.label).toEqual('Additions');
  expect(dataset.data).toEqual([128, 256, 512]);
});

it('maps deletions to dataset', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const data = [
    [1443126400, 128, -64],
    [1445731200, 256, -32],
    [1446336000, 512, -16]
  ];
  const chart = builder
    .setContext(canvas)
    .setData(data)
    .build();

  const dataset = chart.initData.data.datasets[1];
  expect(dataset.label).toEqual('Deletions');
  expect(dataset.data).toEqual([-64, -32, -16]);
});

it('shows times on time axis', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');
  const data = [
    [1443126400, 128, -64],
    [1445731200, 256, -32],
    [1446336000, 512, -16]
  ];
  const chart = builder
    .setContext(canvas)
    .setData(data)
    .build();

  const labels = chart.initData.data.labels;
  expect(labels)
    .toEqual([
      '2015-09-24T22:26:40+02:00',
      '2015-10-25T02:00:00+02:00',
      '2015-11-01T01:00:00+01:00'
    ]);
});

it('renders time X axis', () => {
  const builder = new ChartBuilder();
  const canvas = document.createElement('canvas');

  const chart = builder
    .setContext(canvas)
    .build();

  const options = chart.initData.options;
  const xAxis = options.scales.xAxes[0];
  expect(xAxis.type).toBe('time');
});
