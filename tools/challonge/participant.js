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
    .then(res =>
      res.data.map(player => ({
        id: player.participant.id,
        name: player.participant.name,
        seed: player.participant.seed,
        active: player.participant.active,
        final_rank: player.participant.final_rank,
        checked_in: player.participant.checked_in
      }))
    )
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

module.exports = {
  signUp,
  getAll,
  update,
  checkIn,
  checkOut
};
