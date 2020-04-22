import axios from "axios";

export const animeApiTop020 = axios.create({
  baseURL: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});

export const animeApiTop2040 = axios.create({
  baseURL: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=2",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});

export const animeApiTop4060 = axios.create({
  baseURL: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=4",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});

export const animeApiTopCharacters020 = axios.create({
  baseURL: "https://kitsu.io/api/edge/characters?page[limit]=20&page[offset]=0",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});

export const animeApiTopCharacters2040 = axios.create({
  baseURL: "https://kitsu.io/api/edge/characters?page[limit]=20&page[offset]=2",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});

export const animeApiTopCharacters4060 = axios.create({
  baseURL: "https://kitsu.io/api/edge/characters?page[limit]=20&page[offset]=4",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  },
  method: "GET",
  timeout: 3000,
});
