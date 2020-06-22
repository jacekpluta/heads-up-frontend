//import axios from "axios";
import { default as axiosObservable } from "axios-observable";

export default axiosObservable.create({
  baseURL: "https://the-cocktail-db.p.rapidapi.com",
  method: "GET",
  headers: {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "5bb9e8a323msh942779a3b338994p16b327jsnad6a21812387",
  },
  timeout: 3000,
});
