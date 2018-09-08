const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const endpoint = `${apiEndpoint}/tournaments/`;

const getAll = id => {
  const url = `${endpoint}${id}/matches.json`;
  return axios
    .get(url)
    .then(res => res.data.map(match => match.match))
    .catch(err => err.response.data);
};

const get = ({ id, matchId }) => {
  const url = `${endpoint}${id}/matches/${matchId}.json`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const submitScore = ({ id, matchId }, matchData) => {
  const url = `${endpoint}${id}/matches/${matchId}.json`;
  return axios
    .put(url, matchData)
    .then(res => res.data)
    .catch(err => err.response.data);
};

module.exports = { getAll, get, submitScore };
