import axios from 'axios';
import { GET_TOURNAMENT, TOURNAMENT_LOADING, GET_ERRORS } from './types';

export const createTournament = (tournament, history) => dispatch => {
  axios
    .post('/api/tournament/create', { tournament })
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      } else {
        history.push(`/tournament/${res.data.tournament.id}/admin`);
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getTournament = id => dispatch => {
  dispatch(setTournamentLoading());
  axios
    .get(`/api/tournament/${id}`)
    .then(res => {
      dispatch({
        type: GET_TOURNAMENT,
        payload: res.data
      });
    })
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
