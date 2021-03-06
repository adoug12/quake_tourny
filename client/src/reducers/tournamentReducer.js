import { GET_TOURNAMENT, TOURNAMENT_LOADING } from '../actions/types';

const initialState = {
  data: {},
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
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
