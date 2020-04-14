import * as actionTypes from "./types";

export const setQuestionsResult = (questionsResult) => {
  return {
    type: actionTypes.SET_QUESTIONS_RESULT,
    payload: {
      questionsResult: questionsResult,
    },
  };
};

export const setPoints = (points) => {
  return {
    type: actionTypes.SET_POINTS,
    payload: {
      points: points,
    },
  };
};
