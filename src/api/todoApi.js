import { getLocalStorage } from "../helper/localStorageHandler";
import Axios from "./const";

export const createTodo_API = (todo) => {
  const { access_token } = getLocalStorage("token");

  const url = "/todos";
  return Axios.post(url, todo, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getTodo_API = () => {
  const { access_token } = getLocalStorage("token");

  const url = "/todos";
  return Axios.get(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const updateTodo_API = (id, body) => {
  const { access_token } = getLocalStorage("token");

  const url = `/todos/${id}`;
  return Axios.put(url, body, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteTodo_API = (id) => {
  const { access_token } = getLocalStorage("token");

  const url = `/todos/${id}`;
  return Axios.delete(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
