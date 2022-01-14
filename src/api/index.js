import $axios from "./axios";

const baseURL = "https://avl-frontend-exam.herokuapp.com/";

export const get = (route, params = {}) => {
  const options = {
    method: "get",
    baseURL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    params,
  };

  return $axios.request(route, options);
};
