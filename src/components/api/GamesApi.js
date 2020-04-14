import axios from "axios";

export default axios.create({
  baseURL: "https://rawg-video-games-database.p.rapidapi.com/games",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
  },
  method: "GET",
});
