import React, { Component } from 'react';
import getUniqueId from '../utils/get_unique_id';
import './Chart.css';
import PropTypes from 'prop-types';

class ChartComponent extends Component {
  constructor() {
    super();
    this._id = `chart-${getUniqueId()}`;
  }

  render() {
    return (
      <div><canvas id={this._id}></canvas></div>
    );
  }

  componentDidMount() {
    this._renderChart();
  }

  componentDidUpdate() {
    this._renderChart();
  }

  _renderChart() {
    const data = this.props.data;
    const ChartBuilder = this.props.ChartBuilder;

    if (!(data && ChartBuilder)) {
      return;
    }

    const ctx = this._id;
    const builder = new ChartBuilder();

    builder
      .setContext(ctx)
      .setData(data)
      .build();
  }
}

ChartComponent.propTypes = {
  data: () => {},
  ChartBuilder: PropTypes.func.isRequired
};

export default ChartComponent;
