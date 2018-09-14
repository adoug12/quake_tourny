import {
  GET_PARTICIPANTS,
  GET_PARTICIPANT,
  PARTICIPANTS_LOADING
} from '../actions/types';

const initialState = {
  data: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PARTICIPANTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PARTICIPANTS:
      return {
        data: action.payload,
        loading: false
      };

    case GET_PARTICIPANT:
      return {
        data: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
