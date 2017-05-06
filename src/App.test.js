import React from 'react';
import App from './App';
import FormComponent from './github_repository/FormComponent';
import TestUtils from 'react-dom/test-utils';

it('renders GitHub repo selection component', function() {
  const component = TestUtils.renderIntoDocument(<App />);

  expect(() => {
    TestUtils.findRenderedComponentWithType(component, FormComponent);
  }).not.toThrow();
});
