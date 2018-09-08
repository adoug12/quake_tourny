import axios from 'axios';
import {
  GET_TOURNAMENT,
  TOURNAMENT_NOT_FOUND,
  TOURNAMENT_LOADING,
  PROCESS_CHECKINS,
  START_TOURNAMENT,
  FINALIZE_TOURNAMENT,
  ABORT_TOURNAMENT,
  CHECKIN,
  CHECKOUT,
  SEED_UP,
  GET_ERRORS
} from './types';

export const createTournament = (tournament, history) => dispatch => {
  axios
    .post('/api/tournament/create', { tournament })
    .then(res => history.push(`/tournament/${res.data.tournament.id}/admin`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTournament = id => dispatch => {
  dispatch(setTournamentLoading());
  axios
    .get(`/api/tournament/${id}`)
    .then(res =>
      dispatch({
        type: GET_TOURNAMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOURNAMENT,
        payload: {}
      })
    );
};

export const setTournamentLoading = () => {
  return {
    type: TOURNAMENT_LOADING
  };
};

export const processCheckins = id => dispatch => {
  axios
    .post(`/api/tournament/${id}/process_check_ins`)
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const checkin = (id, playerId) => dispatch => {
  axios
    .post(`/api/tournament/${id}/participants/${playerId}/check_in`)
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const checkout = (id, playerId) => dispatch => {
  axios
    .post(`/api/tournament/${id}/participants/${playerId}/check_out`)
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const seed = (id, playerId, seed) => dispatch => {
  axios
    .put(`/api/tournament/${id}/participants/${playerId}`, { seed })
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const signUp = (id, name) => dispatch => {
  axios
    .post(`/api/tournament/${id}/signup`, { name })
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const startTournament = id => dispatch => {
  axios
    .post(`/api/tournament/${id}/start`)
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};

export const finalizeTournament = id => dispatch => {
  axios
    .post(`/api/tournament/${id}/finalize`)
    .then(res => dispatch(getTournament(id)))
    .catch(err => dispatch(getTournament(id)));
};
