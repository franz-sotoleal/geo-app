import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type:": "application/json",
  },
});

class GeoApi {
  getInfoFromIP = (ip) =>
    api.post("/location").then((response) => response.data);
}

export default new GeoApi();