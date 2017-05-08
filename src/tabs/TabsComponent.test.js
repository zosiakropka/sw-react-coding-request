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
  expect($tabs.find('.tabs__entry-button').length).toBe(2);
  expect($tabs.find('.tabs__entry-button').get(0).value).toBe('Animals');
  expect($tabs.find('.tabs__entry-button').get(1).value).toBe('Plants');
});

it('renders all tab contents', () => {
  const $tabs = mount(<TabsComponent tabDatas={twoTabsDatas}/>);
  expect($tabs.find('.tabs__content--selected').length).toBe(1);
  expect($tabs.find('.tabs__content--hidden').length).toBe(1);
  expect($tabs.find('.tabs__content--selected .component--animals').length).toBe(1);
  expect($tabs.find('.tabs__content--hidden .component--plants').length).toBe(1);
});
