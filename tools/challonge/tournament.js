const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const endpoint = `${apiEndpoint}/tournaments`;

const getAll = () => {
  const url = `${endpoint}.json`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const get = id => {
  const url = `${endpoint}/${id}.json`;
  return axios
    .get(url)
    .then(res => ({
      id: res.data.tournament.id,
      name: res.data.tournament.name,
      description: res.data.tournament.description,
      started_at: res.data.tournament.started_at,
      completed_at: res.data.tournament.completed_at,
      state: res.data.tournament.state,
      signup_cap: res.data.tournament.signup_cap,
      check_in_duration: res.data.tournament.check_in_duration,
      start_at: res.data.tournament.start_at
    }))
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

module.exports = { getAll, get, create, processCheckIns, start, finalize };
