const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const search = name => {
  const endpoint = `${apiEndpoint}/Player/Search`;
  const query = `?term=${name}`;
  const url = `${endpoint}${query}`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
};

module.exports = search;
