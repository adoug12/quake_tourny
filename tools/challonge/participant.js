const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const endpoint = `${apiEndpoint}/tournaments/`;

const signUp = (id, playerData) => {
  const url = `${endpoint}${id}/participants.json`;
  return axios
    .post(url, playerData)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const getAll = id => {
  const url = `${endpoint}${id}/participants.json`;
  return axios
    .get(url)
    .then(res => res.data.map(player => player.participant))
    .catch(err => err.response.data);
};

const get = ({ id, playerId }) => {
  const url = `${endpoint}${id}/participants/${playerId}.json/?include_matches=1`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const update = ({ id, playerId }, playerData) => {
  const url = `${endpoint}${id}/participants/${playerId}.json`;
  return axios
    .put(url, playerData)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const checkIn = ({ id, playerId }) => {
  const url = `${endpoint}${id}/participants/${playerId}/check_in.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const checkOut = ({ id, playerId }) => {
  const url = `${endpoint}${id}/participants/${playerId}/undo_check_in.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const remove = ({ id, playerId }) => {
  const url = `${endpoint}${id}/participants/${playerId}.json`;
  return axios
    .delete(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const clear = id => {
  const url = `${endpoint}${id}/participants/clear.json`;
  return axios
    .delete(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

const randomize = id => {
  const url = `${endpoint}${id}/participants/randomize.json`;
  return axios
    .post(url)
    .then(res => res.data)
    .catch(err => err.response.data);
};

module.exports = {
  signUp,
  getAll,
  get,
  update,
  checkIn,
  checkOut,
  remove,
  clear,
  randomize
};
