import { combineReducers } from 'redux';
import tournamentReducer from './tournamentReducer';
import participantsReducer from './participantsReducer';
import roundsReducer from './roundsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  tournament: tournamentReducer,
  participants: participantsReducer,
  rounds: roundsReducer,
  errors: errorReducer
});
