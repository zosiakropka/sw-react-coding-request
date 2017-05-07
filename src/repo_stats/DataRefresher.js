import _ from 'lodash';
import mediator from '../Mediator';
import Client from '../github_api/Client';
import UrlToIdConverter from '../github_repository/UrlToIdConverter';

class DataRefresher {
  constructor({statName}) {
    this._repoEntered = this._repoEntered.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onError = this.onError.bind(this);
    this.offRefresh = this.offRefresh.bind(this);
    this.offError = this.offError.bind(this);

    mediator.on('github_repo:entered', this._repoEntered);

    this._statName = statName;
    this._client = new Client();
    this._callbacks = [];
    this._fallbacks = [];
  }

  onRefresh(callback) {
    this._callbacks.push(callback);

    return this;
  }

  onError(fallback) {
    this._fallbacks.push(fallback);

    return this;
  }

  offRefresh(callbackToRemove) {
    this._callbacks = this._callbacks
      .filter((callback) => callback !== callbackToRemove);

    return this;
  }

  offError(fallbackToRemove) {
    this._fallbacks = this._fallbacks
      .filter((fallback) => fallback !== fallbackToRemove);

    return this;
  }

  _repoEntered({repoUrl}) {
    this._passDataToCallbacks(null);
    const repoId = UrlToIdConverter.convertUrlToId(repoUrl);

    if (!_.isString(repoId)) {
      return;
    }

    this._client.fetchStat({
      repoId: repoId,
      statName: this._statName})
        .then((data) => {
          this._passDataToCallbacks(data);
        })
        .catch(() => {
          this._passDataToFallbacks(null);
        });
  }

  _passDataToCallbacks(data) {
    _.each(
      this._callbacks,
      (callback) => {
        callback({data: data});
      });
  }

  _passDataToFallbacks(data) {
    _.each(
      this._fallbacks,
      (fallback) => {
        fallback({data: data});
      });
  }
}

export default DataRefresher;
