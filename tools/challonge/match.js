const axios = require('axios');
const apiEndpoint = require('./config').apiEndpoint;

const endpoint = `${apiEndpoint}/tournaments/`;

const getAll = id => {
  const url = `${endpoint}${id}/matches.json`;
  return axios
    .get(url)
    .then(res =>
      res.data.map(match => ({
        id: match.match.id,
        tournament_id: match.match.tournament_id,
        state: match.match.state,
        player1_id: match.match.player1_id,
        player2_id: match.match.player2_id,
        player1_prereq_match_id: match.match.player1_prereq_match_id,
        player2_prereq_match_id: match.match.player2_prereq_match_id,
        winner_id: match.match.winner_id,
        loser_id: match.match.loser_id,
        identifier: match.match.identifier,
        round: match.match.round,
        scores_csv: match.match.scores_csv
      }))
    )
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
