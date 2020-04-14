import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initialQuestionsResultState = {
  questionsResult: null,
};

const questionsResult_reducer = (
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
  points: null,
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

const rootReducer = combineReducers({
  points: points_reducer,
  questionsResult: questionsResult_reducer,
});

export default rootReducer;
