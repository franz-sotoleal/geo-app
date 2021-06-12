import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.99.102:31466/",
  headers: {
    "Content-Type:": "application/json",
  },
});

class GeoApi {
  getInfoFromIP = (ip) =>
    api.post("api/location-for-ip").then((response) => response.data);
}

export default new GeoApi();