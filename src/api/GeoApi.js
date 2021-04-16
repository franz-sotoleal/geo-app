import axios from "axios";

const api = axios.create({
    baseURL: `http://locahost:5000/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

class GeoApi {
  getInfoFromIP = (ip) =>
    api
      .post("api/location-for-ip", {
        email: "test@mail.com",
        password: "12345678",
        ip: ip,
      })
      .then((response) => response.data);
}

export default new GeoApi();
