/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { checkEmail, checkPassword } from "../helper/validationCheck";
import { Link } from "react-router-dom";
import { signin_API } from "../api/signApi";
import {
  getLocalStorage,
  setLocalStorage,
} from "../helper/localStorageHandler";
import { USER } from "../mock/data/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { routeTo } = useRouter();

  useEffect(() => {
    if (!!getLocalStorage("token")) {
      routeTo("/todo");
    }
  }, []);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const userInfo = { email, password };

    if (email === USER.email && password === USER.password) {
      routeTo("/todo");
    }

    try {
      const response = await signin_API(userInfo);
      if (response.status === 200) {
        setLocalStorage(response.data);
        routeTo("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChageEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChagePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="member-wrapper">
      <form className="member-form" onSubmit={loginSubmitHandler}>
        <label>
          아이디
          <input
            type="email"
            onChange={onChageEmail}
            data-testid="email-input"
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            onChange={onChagePassword}
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          className="member-wrapper-button"
          disabled={
            checkEmail(email) !== "success" ||
            checkPassword(password) !== "success"
          }
          data-testid="signin-button"
        >
          로그인
        </button>
      </form>
      <div className="member-link">
        <span>회원가입을 하시지 않으셨다면?</span>
        <Link to={"/signup"}>회원가입</Link>
      </div>
    </div>
  );
};

export default Login;
