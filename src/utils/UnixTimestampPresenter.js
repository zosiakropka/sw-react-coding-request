import moment from 'moment';

const UNIX_TIME_FORMAT = 'X';

const UnixTimestampPresenter = {
  toMonthYearShort: (unixTimestamp) => {
    const date = moment(unixTimestamp, UNIX_TIME_FORMAT);
    if (!date.isValid()) {
      return null;
    }

    return date.format('YYYY/MM');
  }
};

export default UnixTimestampPresenter;
