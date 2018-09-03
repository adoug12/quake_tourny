const axios = require('axios');
const apiEndpoint = 'https://stats.quake.com/api/v2';

const player = alias => {
  const endpoint = `${apiEndpoint}/Player/Stats`;
  const query = `?name=${alias}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
};

module.exports = {
  player
};
