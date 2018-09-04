const axios = require('axios');
const apiEndpoint = require('./common').apiEndpoint;

const games = alias => {
  const endpoint = `${apiEndpoint}/Player/GamesSummary`;
  const query = `?name=${alias}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data.matches.filter(match => match.gameMode === 'DUEL'))
    .catch(err => err);
};

module.exports = games;
