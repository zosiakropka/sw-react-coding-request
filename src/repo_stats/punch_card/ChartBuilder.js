import Chart from 'chart.js';
import _ from 'lodash';
import moment from 'moment';

// @NOTE:
// Data format:
// [WEEK_DAY, HOUR_OF_DAY, NUMBER_OF_COMMITS]
// where:
// WEEK_DAY in 0-6 (Sunday-Saturday)
// HOUR_OF_DAY in 0-23
// NUMBER_OF_COMMITS - integer

const TYPE = 'bubble';

const POINT_BG_COLOR = 'rgba(75,192,192,0.4)';
const POINT_BORDER_COLOR = 'rgba(75,192,192,1)';

const normalizeNumber = ({value, maxValue, maxRadius}) => {
  if (maxValue === 0) {
    return 0;
  }

  return value / maxValue * maxRadius;
};

const findMaxCommitsInInput = (inputData) => {
  const maxEntry = _.maxBy(inputData, (entry) => entry[2]);
  if (!_.isArray(maxEntry)) {
    return null;
  }

  return maxEntry[2];
};

const inputToOutput = (inputData) => {
  if (!_.isArray(inputData)) {
    return {};
  }

  const maxCommitsADay = findMaxCommitsInInput(inputData);

  const data = inputData
    .filter((entry) => entry[2] !== 0)
    .map((entry) => {
      var weekDay = entry[0];
      var hour = entry[1];
      var commits = entry[2];
      var radius = normalizeNumber({
        value: commits,
        maxValue: maxCommitsADay,
        maxRadius: 20});

      return {
        x: hour,
        y: weekDay,
        r: radius,
        commits: commits
      };
    });

  return {data: data};
};

const hourIdToAmPm = (hourIndex) => {
  if (hourIndex < 0 || hourIndex > 23) {
    return '';
  }
  const time = moment(hourIndex, 'H');
  if (!time.isValid()) {
    return '';
  }

  return time.format('hha');
};

const weekDayIdToWeekName = (weekDayId) => {
  if (weekDayId < 0 || weekDayId > 6) {
    return '';
  }
  const date = moment(weekDayId, 'e');
  if (!date.isValid()) {
    return '';
  }

  return date.format('dddd');
};

class ChartBuilder {
  constructor() {
    this._context = null;
    this._data = [];
    this._responsive = true;
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
    const dataset = {
      data: outputData.data,
      backgroundColor: [POINT_BG_COLOR],
      borderColor: [POINT_BORDER_COLOR]
    };
    const config = {
      type: TYPE,
      data: {
        datasets: [dataset]
      },
      options: {
        legend: {display: false},
        tooltips: {
          callbacks: {
            label: (point) => {
              const commits = outputData
                .data[point.index]
                .commits;

              return `${commits} commits`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: -1,
                max: 24,
                stepSize: 1,
                userCallback: (label) => {
                  return hourIdToAmPm(label);
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: -1,
                max: 7,
                stepSize: 1,
                userCallback: (label) => {
                  return weekDayIdToWeekName(label);
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
