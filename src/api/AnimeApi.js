import axios from "axios";

export default axios.create({
  method: "GET",
  baseurl: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
    links: {
      first: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=1",
    },
  },
});
