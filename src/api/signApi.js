import Axios from "./const";

export const signin_API = (body) => {
  const url = "/auth/signin";
  return Axios.post(url, body);
};

export const signup_API = (body) => {
  const url = "/auth/signup";
  return Axios.post(url, body);
};
