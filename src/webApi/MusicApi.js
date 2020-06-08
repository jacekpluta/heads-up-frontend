import axios from "axios";

export default axios.create({
  baseURL: "https://spotifystefan-skliarovv1.p.rapidapi.com",
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "5bb9e8a323msh942779a3b338994p16b327jsnad6a21812387",
  },
  timeout: 5000,
});
