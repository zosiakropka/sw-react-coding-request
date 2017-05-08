import React from 'react';
import ChartComponent from './ChartComponent';
import { mount } from 'enzyme';

const buildWithValues = jest.fn();
const MockChartBuilder = class {
  constructor() {
    this.valuesSet = {};
  }
  setContext(ctx) {
    this.valuesSet.ctx = ctx;

    return this;
  }
  setData(data) {
    this.valuesSet.data = data;

    return this;
  }
  build() {
    buildWithValues(this.valuesSet);
  }
};

it('renders chart with given Builder', () => {
  const mockData = {key: 'value'};

  const component = <ChartComponent
    ChartBuilder={MockChartBuilder}
    data={mockData} />;
  const $component = mount(component);

  const domId = $component.find('canvas').prop('id');
  expect(domId).toBeDefined();

  expect(buildWithValues)
    .toBeCalledWith({
      ctx: domId,
      data: mockData
    });
});
