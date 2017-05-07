import Chart from 'chart.js';
import _ from 'lodash';
import moment from 'moment';

const BG_COLOR = 'rgba(54, 162, 235, 1)';

const inputToOutput = (inputData) => {
  if (!_.isArray(inputData)) {
    return {};
  }

  const labels = [];

  const data = _.map(inputData, (weekData) => {
    const timestamp = weekData.week;
    const commits = weekData.total;
    const label = moment(timestamp, 'X').format();

    labels.push(label);

    return commits;
  });

  return {
    labels: labels,
    data: data
  };
};

class ChartBuilder {
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
    const dataset = {
      data: outputData.data,
      backgroundColor: BG_COLOR
    };
    const config = {
      type: 'bar',
      data: {
        labels: outputData.labels,
        datasets: [dataset]
      },
      options: {
        legend: {display: false},
        tooltips: {
          callbacks: {
            label: (point) => {
              return `${point.yLabel} commits`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                stepSize: 30,
                userCallback: (label) => {
                  return moment(label).format('DD/MMM');
                }
              }
            }
            // {
            //   type: 'time',
            //   unit: 'week',
            //   unitStepSize: 1,
            //   categoryPercentage: 0.1,
            //   time: {
            //     displayFormats: {
            //       month: 'YYYY/MM',
            //       year: 'YYYY'
            //     }
            //   }
            // }
          ]
        }
      }
    };

    return new Chart(this._ctx, config);
  }
}

export default ChartBuilder;
