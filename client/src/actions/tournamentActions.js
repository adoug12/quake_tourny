import axios from 'axios';
import { GET_ERRORS } from './types';

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
