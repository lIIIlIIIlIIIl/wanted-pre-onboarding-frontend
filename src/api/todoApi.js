import { getLocalStorage } from "../helper/localStorageHandler";
import Axios from "./const";

const { access_token } = getLocalStorage("token");

export const postTodo_API = (todo) => {
  const url = "/todos";
  return Axios.post(url, todo, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getTodo_API = () => {
  const url = "/todos";
  return Axios.get(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
