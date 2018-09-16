const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;
const moment = require('moment-timezone');

const endpoint = `${apiEndpoint}/tournaments`;

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
  tournamentData.start_at = moment(tournamentData.start_at)
    .tz(tournamentData.time_zone)
    .format();
  const postData = {
    ...tournamentData,
    open_signup: false,
    hide_forum: true,
    private: true
  };
  return axios
    .post(url, postData)
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
