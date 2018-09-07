import axios from 'axios';
import {
  GET_TOURNAMENT,
  TOURNAMENT_NOT_FOUND,
  TOURNAMENT_LOADING,
  GET_ERRORS
} from './types';

// Create Tournament
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
