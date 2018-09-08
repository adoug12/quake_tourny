import { GET_ROUNDS, ROUNDS_LOADING } from '../actions/types';

const initialState = {
  data: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUNDS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROUNDS:
      return {
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
