jest.mock('request-promise-native', () => {
  const rq = jest.fn((url) => {
    const promise = new Promise((resolve, reject) => {
      if (url.match(/resolve/)) {
        resolve('{"statsKey": ["statsValues", 1, 2, 3]}');
      } else if (url.match(/reject/)) {
        const err = new Error({
          error: {message: 'Not Found'},
          statusCode: 404,
          name: 'StatusCodeError'});
        reject(err);
      }
    });

    return promise;
  });

  return rq;
});

import Client from './Client';
import rq from 'request-promise-native';

describe('Client', () => {
  describe('#fetchStat()', () => {
    var client;
    var callback;
    var fallback;

    beforeEach(() => {
      client = new Client();
      callback = jest.fn();
      fallback = jest.fn();
    });

    it('fetches from given API endpoint', () => {
      client.fetchStat({
        repoId: 'zosia/example',
        statName: 'any_stats'});

      expect(rq)
        .toBeCalledWith('https://api.github.com/repos/zosia/example/stats/any_stats');
    });

    xit('resolves data if request succeeded', () => {
      client.fetchStat({
        repoId: 'zosia/resolve',
        statName: 'any_stats'})
          .then(callback)
          .catch(fallback);

      expect(callback).toBeCalledWith({statsKey: ['statsValues', 1, 2, 3]});
    });

    xit('rejects if request failed', () => {
      client.fetchStat({
        repoId: 'zosia/reject',
        statName: 'any_stats'})
          .then(callback)
          .catch(fallback);

      expect(fallback).toBeCalled();
    });
  });
});
