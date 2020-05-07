import axios from "axios";

export const games = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/games",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
  timeout: 3000,
});

export const genres = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/genres",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
  timeout: 3000,
});

export const tags = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/tags",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
  timeout: 3000,
});

export const developers = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/developers",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
  timeout: 3000,
});

export const publishers = axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/publishers",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
  timeout: 3000,
});
