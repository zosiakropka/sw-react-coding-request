import React from 'react';
import TabsComponent from './TabsComponent';
import { mount } from 'enzyme';

const twoTabsDatas = [
  {
    name: 'Animals',
    children: <div className="component--animals"></div>
  },
  {
    name: 'Plants',
    children: <div className="component--plants"></div>
  }
];

it('renders all tab buttons', () => {
  const $tabs = mount(<TabsComponent tabDatas={twoTabsDatas}/>);
  expect($tabs.find('.tab-content').length).toBe(2);
  expect($tabs.find('.tab-content .component--animals').length).toBe(1);
  expect($tabs.find('.tab-content .component--plants').length).toBe(1);
});

it('renders all tab contents', () => {
  const $tabs = mount(<TabsComponent tabDatas={twoTabsDatas}/>);
  expect($tabs.find('.tab-button').length).toBe(2);
  expect($tabs.find('.tab-button').get(0).value).toBe('Animals');
  expect($tabs.find('.tab-button').get(1).value).toBe('Plants');
});
