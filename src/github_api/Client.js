import rq from 'request-promise-native';

class Client {
  fetchStat({repoId, statName}) {
    const url = `https://api.github.com/repos/${repoId}/stats/${statName}`;

    return rq(url)
      .then((body) => {
        return JSON.parse(body);
      });
  }
}

export default Client;
