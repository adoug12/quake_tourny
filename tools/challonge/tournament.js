const axios = require('axios');
const apiEndpoint = require('./common').apiEndpoint;

const endpoint = `${apiEndpoint}/tournaments`;

const get = id => {
  const url = `${endpoint}/${id}.json`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const create = tournamentData => {
  const url = `${endpoint}.json`;
  return axios
    .post(url, tournamentData)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const processCheckIns = id => {
  const url = `${endpoint}/${id}/process_check_ins.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const start = id => {
  const url = `${endpoint}/${id}/start.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const finalize = id => {
  const url = `${endpoint}/${id}/finalize.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

module.exports = { get, create, processCheckIns, start, finalize };
