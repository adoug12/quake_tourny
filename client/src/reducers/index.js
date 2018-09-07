import { combineReducers } from 'redux';
import tournamentReducer from './tournamentReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  tournament: tournamentReducer,
  errors: errorReducer
});
