import * as actionTypes from "./types";
import MusicApi from "../webApi/MusicApi";

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

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      user: user,
    },
  };
};

export const fetchMusicEntries = () => {
  return async (dispatch, getState) => {
    const responseEminem = await MusicApi.get("/search?q=eminem");
    const responseA = await MusicApi.get("/search?q=a");
    const responseB = await MusicApi.get("/search?q=b");
    const responseC = await MusicApi.get("/search?q=c");
    const responseD = await MusicApi.get("/search?q=d");

    const response = [
      responseEminem.data.data,
      responseA.data.data,
      responseB.data.data,
      responseC.data.data,
      responseD.data.data,
    ];

    const combinedResponses = response.reduce((a, b) => [...a, ...b], []);

    const allTitles = combinedResponses.map((response) => response.title);

    dispatch({ type: actionTypes.FETCH_MUSIC, payload: allTitles });
  };
};
