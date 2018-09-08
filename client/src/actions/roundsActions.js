import axios from 'axios';
import { GET_ROUNDS, ROUNDS_LOADING, GET_ERRORS } from './types';

export const getRounds = id => dispatch => {
  dispatch(setRoundsLoading());
  axios
    .get(`/api/tournament/${id}/rounds`)
    .then(res =>
      dispatch({
        type: GET_ROUNDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ROUNDS,
        payload: {}
      })
    );
};

export const setRoundsLoading = () => {
  return {
    type: ROUNDS_LOADING
  };
};
