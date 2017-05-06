import UnixTimestampPresenter from './UnixTimestampPresenter';

const UNIX_TIMESTAMP_STRING = '1445126445.493';
const UNIX_TIMESTAMP_INT = 1445126445.493;
const JAVASCRIPT_DATE_INT = 1445126445493;

describe('UnixTimestampPresenter', () => {
  describe('#toMonthYearShort()', () => {
    it('parses String unix timestamp to "YYYY/MM" format', () => {
      const parsed = UnixTimestampPresenter
        .toMonthYearShort(UNIX_TIMESTAMP_STRING);
      expect(parsed).toEqual('2015/10');
    });

    it('parses Number unix timestamp to "YYYY/MM" format', () => {
      const parsed = UnixTimestampPresenter
        .toMonthYearShort(UNIX_TIMESTAMP_INT);
      expect(parsed).toEqual('2015/10');
    });

    it('doesn`t support JS Date integer as input', () => {
      const parsed = UnixTimestampPresenter
        .toMonthYearShort(JAVASCRIPT_DATE_INT);
      expect(parsed).not.toEqual('2015/10');
    });

    it('returns null for null input', () => {
      const parsed = UnixTimestampPresenter
        .toMonthYearShort(null);
      expect(parsed).toEqual(null);
    });
  });
});
