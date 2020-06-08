import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initialQuestionsResultState = {
  questionsResult: [],
};

export const questionsResult_reducer = (
  state = initialQuestionsResultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_QUESTIONS_RESULT:
      return {
        questionsResult: action.payload.questionsResult,
      };
    default:
      return state;
  }
};

const initialPointsState = {
  points: [],
};

const points_reducer = (state = initialPointsState, action) => {
  switch (action.type) {
    case actionTypes.SET_POINTS:
      return {
        ...state,
        points: action.payload.points,
      };

    default:
      return state;
  }
};

const initialUserState = {
  user: null,
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const initialMusicEntriesState = {
  musicEntries: [],
};

const musicEntries_reducer = (state = initialMusicEntriesState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MUSIC:
      return action.payload;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  points: points_reducer,
  questionsResult: questionsResult_reducer,
  musicEntries: musicEntries_reducer,
});

export default rootReducer;
