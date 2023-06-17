import { getLocalStorage } from "../helper/localStorageHandler";
import Axios from "./const";

const KEY = getLocalStorage("token");

export const createTodo_API = (todo) => {
  const url = "/todos";
  return Axios.post(url, todo, {
    headers: { Authorization: `Bearer ${KEY?.access_token}` },
  });
};

export const getTodo_API = () => {
  const url = "/todos";
  return Axios.get(url, {
    headers: { Authorization: `Bearer ${KEY?.access_token}` },
  });
};

export const updateTodo_API = (id, body) => {
  const url = `/todos/${id}`;
  return Axios.put(url, body, {
    headers: { Authorization: `Bearer ${KEY?.access_token}` },
  });
};

export const deleteTodo_API = (id) => {
  const url = `/todos/${id}`;
  return Axios.delete(url, {
    headers: { Authorization: `Bearer ${KEY?.access_token}` },
  });
};
