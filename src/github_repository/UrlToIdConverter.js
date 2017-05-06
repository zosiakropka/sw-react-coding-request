import _ from 'lodash';

const GITHUB_REPO_URL_PREFIX_PATTERN = /^((https?\:\/\/)|(git@))github.com[\:\/]/;
const GITHUB_REPO_URL_SUFFIX_PATTERN = /\.git$/;

const isValidGithubRepoUrl = (url) => {
  return _.isString(url)
    && url.match(GITHUB_REPO_URL_PREFIX_PATTERN);
};

class UrlToIdConverter {
  static convertUrlToId(url) {
    if (!isValidGithubRepoUrl(url)) {
      return null;
    }

    return url
      .replace(GITHUB_REPO_URL_PREFIX_PATTERN, '')
      .replace(GITHUB_REPO_URL_SUFFIX_PATTERN, '');
  }
}

export default UrlToIdConverter;
