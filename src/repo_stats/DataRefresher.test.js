import DataRefresher from './DataRefresher';
import mediator from '../Mediator';

jest.mock('../github_api/Client', () => {
  const ClientMock = class {
    fetchStat({repoId, statName}) {
      ClientMock.hacks.fetchStat({
        repoId: repoId,
        statName: statName});
      const promise = new Promise((resolve, reject) => {
        if (repoId.match(/resolve/)) {
          resolve({someStats: 'about repository'});
        } else if (repoId.match(/reject/)) {
          const err = new Error({
            error: {message: 'Not Found'},
            statusCode: 404,
            name: 'StatusCodeError'
          });
          reject(err);
        }
      });

      return promise;
    }
  };
  ClientMock.hacks = { fetchStat: jest.fn() };

  return ClientMock;
});
import Client from '../github_api/Client';

describe('on "github_repo:entered" message', () => {
  var statName;
  var dataRefresher;
  var callback;
  var fallback;

  beforeEach(() => {
    statName = 'punch_card';
    dataRefresher = new DataRefresher({statName: statName});
    callback = jest.fn();
    fallback = jest.fn();

    dataRefresher.onRefresh(callback);
    dataRefresher.onError(fallback);
  });

  describe('with repoUrl is null', () => {
    beforeEach(() => {
      mediator.emit('github_repo:entered', {repoUrl: null});
    });

    it('executes callback with null', () => {
      expect(callback).toBeCalledWith({data: null});
    });

    it('doesn`t fetch the stat', () => {
      expect(Client.hacks.fetchStat)
        .not.toHaveBeenCalled();
    });
  });

  describe('when repoUrl is ""', () => {
    beforeEach(() => {
      mediator.emit('github_repo:entered', {repoUrl: null});
    });

    it('executes callback with null', () => {
      expect(callback).toBeCalledWith({data: null});
    });

    it('doesn`t fetch the stat', () => {
      expect(Client.hacks.fetchStat)
        .not.toHaveBeenCalled();
    });
  });

  describe('when repoUrl is invalid GitHub repo URL', () => {
    beforeEach(() => {
      mediator.emit('github_repo:entered', {repoUrl: 'its-not-a-github-repo'});
    });

    it('executes callback with null', () => {
      expect(callback).toBeCalledWith({data: null});
    });

    it('doesn`t fetch the stat', () => {
      expect(Client.hacks.fetchStat)
        .not.toHaveBeenCalled();
    });
  });

  describe('when repoUrl is valid GitHub repo URL', () => {
    it('executes callback with null and fetches the stat', () => {
      mediator.emit(
        'github_repo:entered',
        {repoUrl: 'git@github.com:zosia/exercise.git'});
      expect(callback).toBeCalledWith({data: null});

      expect(Client.hacks.fetchStat)
        .toBeCalledWith({
          repoId: 'zosia/exercise',
          statName: statName});
    });

    xit('calls callback on success', () => {
      mediator.emit(
        'github_repo:entered',
        {repoUrl: 'git@github.com:zosia/resolve.git'});

      expect(callback).toBeCalledWith({data: {someStats: 'about repository'}});
    });

    xit('calls fallback on error', () => {
      mediator.emit(
        'github_repo:entered',
        {repoUrl: 'git@github.com:zosia/reject.git'});

      expect(fallback).toBeCalled();
    });
  });

  describe('after calling offRefresh()', () => {
    it('stops calling callbacks', () => {
      dataRefresher.offRefresh(callback);

      mediator.emit(
        'github_repo:entered',
        {repoUrl: ''});

      expect(callback).not.toBeCalled();
    });
  });

  describe('after calling offError()', () => {
    it('stops calling fallbacks', function() {
      dataRefresher.offError(fallback);

      mediator.emit(
        'github_repo:entered',
        {repoUrl: 'zosia/reject'});

      expect(fallback).not.toBeCalled();
    });
  });
});
