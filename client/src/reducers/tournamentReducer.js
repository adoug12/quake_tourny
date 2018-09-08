import { GET_TOURNAMENT, TOURNAMENT_LOADING } from '../actions/types';

const initialState = {
  info: {},
  matches: [],
  players: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOURNAMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TOURNAMENT:
      return {
        ...state,
        info: action.payload.info,
        matches: action.payload.matches,
        players: action.payload.players,
        loading: false
      };
    default:
      return state;
  }
};
