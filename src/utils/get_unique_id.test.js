import getUniqueId from './get_unique_id';
import _ from 'lodash';

describe('#getUniqueId()', () => {
  it('returns a string', () => {
    const uid = getUniqueId();
    expect(typeof uid).toEqual('string');
  });

  it('returns unique values', function() {
    const attempts = 500;
    const results = _()
      .range(attempts)
      .map(() => getUniqueId())
      .uniq()
      .value();

    expect(results.length).toBe(attempts);
  });
});
