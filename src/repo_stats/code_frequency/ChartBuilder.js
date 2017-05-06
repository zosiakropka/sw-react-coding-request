import Chart from 'chart.js';
import _ from 'lodash';
import moment from 'moment';

const TYPE = 'line';

const ADDITIONS_LABEL = 'Additions';
const ADDITIONS_BG_COLOR = 'rgba(75, 192, 192, 0.2)';
const ADDITIONS_BORDER_COLOR = 'rgba(75, 192, 192, 1)';

const DELETIONS_LABEL = 'Deletions';
const DELETIONS_BG_COLOR = 'rgba(255, 99, 132, 0.2)';
const DELETIONS_BORDER_COLOR = 'rgba(255, 99, 132, 1)';

const BORDER_WIDTH = 1;

const inputToOutput = (inputData) => {
  const outputData = {
    labels: [],
    additions: [],
    deletions: []
  };

  _.each(inputData, (weekData) => {
    const timestamp = weekData[0];
    const additions = weekData[1];
    const deletions = weekData[2];
    const label = moment(timestamp, 'X').format();

    outputData.labels.push(label);
    outputData.additions.push(additions);
    outputData.deletions.push(deletions);
  });

  return outputData;
};

class ChartBuilder {
  constructor() {
    this._context = null;
    this._data = [];
    this._responsive = true;
    this._maxTicksLimit = 20;
  }

  setData(data) {
    this._data = data;

    return this;
  }

  setContext(ctx) {
    this._ctx = ctx;

    return this;
  }

  build() {
    const outputData = inputToOutput(this._data);
    const additionsDataset = {
      label: ADDITIONS_LABEL,
      data: outputData.additions,
      backgroundColor: [ADDITIONS_BG_COLOR],
      borderColor: [ADDITIONS_BORDER_COLOR],
      borderWidth: BORDER_WIDTH,
      pointRadius: 0,
      lineTension: 0
    };
    const deletionsDataset = {
      label: DELETIONS_LABEL,
      data: outputData.deletions,
      backgroundColor: [DELETIONS_BG_COLOR],
      borderColor: [DELETIONS_BORDER_COLOR],
      borderWidth: BORDER_WIDTH,
      pointRadius: 0,
      lineTension: 0
    };
    const config = {
      type: TYPE,
      data: {
        labels: outputData.labels,
        datasets: [additionsDataset, deletionsDataset]
      },
      options: {
        responsive: this._responsive,
        elements: {
          line: {cubicInterpolationMode: 'monotone'}
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  month: 'YYYY/MM',
                  year: 'YYYY'
                }
              }
            }
          ]
        }
      }
    };

    return new Chart(this._ctx, config);
  }
}

export default ChartBuilder;
