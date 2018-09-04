const axios = require('axios');
const apiEndpoint = require('./common').apiEndpoint;

const matchupHistory = (alias1, alias2) => {
  return games(alias1)
    .then(data =>
      Promise.all(
        data.map(match =>
          game(match.id)
            .then(data => data)
            .catch(err => err)
        )
      ).then(results =>
        results.filter(
          result =>
            result.battleReportPersonalStatistics.filter(
              player => player.nickname === alias2
            ).length > 0
        )
      )
    )
    .catch(err => err);
};

const games = alias => {
  const endpoint = `${apiEndpoint}/Player/GamesSummary`;
  const query = `?name=${alias}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data.matches.filter(match => match.gameMode === 'FFA'))
    .catch(err => err);
};

const game = id => {
  const endpoint = `${apiEndpoint}/Player/Games`;
  const query = `?id=${id}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
};

module.exports = matchupHistory;
