import axios from 'axios';
import { GET_PARTICIPANTS, PARTICIPANTS_LOADING } from './types';

export const getParticipants = id => dispatch => {
  dispatch(setParticipantsLoading());
  axios
    .get(`/api/tournament/${id}/participants`)
    .then(res =>
      dispatch({
        type: GET_PARTICIPANTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PARTICIPANTS,
        payload: {}
      })
    );
};

export const setParticipantsLoading = () => {
  return {
    type: PARTICIPANTS_LOADING
  };
};

export const checkin = (id, playerId) => dispatch => {
  axios
    .post(`/api/tournament/${id}/participants/${playerId}/check_in`)
    .then(res => dispatch(getParticipants(id)))
    .catch(err => dispatch(getParticipants(id)));
};

export const checkout = (id, playerId) => dispatch => {
  axios
    .post(`/api/tournament/${id}/participants/${playerId}/check_out`)
    .then(res => dispatch(getParticipants(id)))
    .catch(err => dispatch(getParticipants(id)));
};

export const seed = (id, playerId, seed) => dispatch => {
  axios
    .put(`/api/tournament/${id}/participants/${playerId}`, { seed })
    .then(res => dispatch(getParticipants(id)))
    .catch(err => dispatch(getParticipants(id)));
};

export const signUp = (id, name) => dispatch => {
  axios
    .post(`/api/tournament/${id}/signup`, { name })
    .then(res => dispatch(getParticipants(id)))
    .catch(err => dispatch(getParticipants(id)));
};
