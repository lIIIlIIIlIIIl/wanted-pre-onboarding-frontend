import React, { useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { checkEmail } from "../helper/validationCheck";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { routeTo } = useRouter();

  const signupSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChageEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChagePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="member-wrapper">
      <form className="member-form" onSubmit={signupSubmitHandler}>
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
            checkEmail(email) === "success" &&
            checkEmail(password) === "success"
              ? ""
              : "disabled"
          }
          data-testid="signup-button"
        >
          회원가입
        </button>
      </form>
      <div className="member-link">
        <span>이미 회원이시라면?</span>
        <Link to={"/signin"}>로그인</Link>
      </div>
    </div>
  );
};

export default Signup;
