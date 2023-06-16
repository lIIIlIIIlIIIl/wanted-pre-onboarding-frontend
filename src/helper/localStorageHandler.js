export const setLocalStorage = (data) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const getLocalStorage = (keyName) => {
  return JSON.parse(localStorage.getItem(keyName));
};
