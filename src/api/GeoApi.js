import axios from "axios";

const api = axios.create({
    baseURL: `http://192.168.99.102:31466/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

class GeoApi {
  getInfoFromIP = (ip) =>
    api
      .post("api/products", {
        email: "test@mail.com",
        password: "12345678",
        country: ip,
      })
      .then((response) => response.data);
}

export default new GeoApi();
