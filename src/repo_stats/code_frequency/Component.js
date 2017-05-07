import React, { Component } from 'react';
import ChartComponent from '../ChartComponent';
import ChartBuilder from './ChartBuilder';
import DataRefresher from '../DataRefresher';

class CodeFrequencyComponent extends Component {
  constructor() {
    super();
    this.state = {};
    this._dataChanged = this._dataChanged.bind(this);
    this._dataMissing = this._dataMissing.bind(this);
    this._dataRefresher = (
      new DataRefresher({statName: 'code_frequency'}))
        .onRefresh(this._dataChanged)
        .onError(this._dataMissing);
  }

  render() {
    return (
      <div><ChartComponent
        data={this.state.data}
        ChartBuilder={ChartBuilder}
        /></div>
    );
  }

  _dataChanged({data}) {
    this.setState({ data: data });
  }

  _dataMissing() {
    this.setState({ data: null });
  }
}

export default CodeFrequencyComponent;
