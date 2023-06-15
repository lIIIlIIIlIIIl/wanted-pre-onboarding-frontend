export const checkEmail = (email) => {
  return email.indexOf("@") === -1 ? "fail" : "success";
};

export const checkPassword = (password) => {
  return password.length < 8 ? "fail" : "success";
};
