import axios from "axios";

const $axios = axios.create({
  timeout: 30 * 1000,
});

$axios.interceptors.response.use(
  (response) => {
    console.log(response.status, response.config.url);
    return response.data;
  },
  (error) => {
    console.error("[API] ", error.message);
    return Promise.reject(error);
  }
);

export default $axios;
