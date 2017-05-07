import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import DataRefresher from './DataRefresher';

class StatComponent extends Component {
  constructor({statName, ChartBuilder}) {
    super();
    this.state = {};
    this._ChartBuilder = ChartBuilder;
    this._dataChanged = this._dataChanged.bind(this);
    this._dataMissing = this._dataMissing.bind(this);
    this._dataRefresher = (
      new DataRefresher({statName: statName}))
        .onRefresh(this._dataChanged)
        .onError(this._dataMissing);
  }

  render() {
    return (
      <div><ChartComponent
        data={this.state.data}
        ChartBuilder={this._ChartBuilder}
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

export default StatComponent;
