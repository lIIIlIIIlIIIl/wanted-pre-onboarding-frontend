/* eslint-disable testing-library/no-unnecessary-act */
import { BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { USER } from "../mock/data/auth";

jest.mock("react-router-dom");
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Navigate: jest.fn(() => null),
}));

function customRender() {
  render(<Signup />, { wrapper: BrowserRouter });

  const email = screen.getByRole("textbox", { name: "아이디" });
  const password = screen.getByRole("textbox", { name: "비밀번호" });
  const signupButton = screen.getByRole("button", { name: "회원가입" });
  return { email, password, signupButton };
}

test("회원가입 화면이 렌더링된다", () => {
  const { email, password, signupButton } = customRender();

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test("회원가입 화면 버튼과 입력창 초기 상태", () => {
  const { email, password, signupButton } = customRender();
  expect(email.value).toBe("");
  expect(password.value).toBe("");

  expect(signupButton).toBeDisabled();
});

test("이메일에 '@'가 포함되고 비밀번호의 길이가 8이 넘는 경우 버튼 활성화", async () => {
  const user = userEvent.setup();

  const { email, password, signupButton } = customRender();

  expect(signupButton).toBeDisabled();

  await act(async () => {
    await user.type(email, USER.email);
    await user.type(password, USER.password);
  });

  expect(signupButton).toBeEnabled();
});

test("이메일, 비밀번호가 올바르지 않으면 로그인 버튼은 비활성화", async () => {
  const { email, password, signupButton } = customRender();
  expect(signupButton).toBeDisabled();

  await act(async () => {
    await userEvent.type(email, "test");
    await userEvent.type(password, "pw");
  });

  expect(signupButton).toBeDisabled();
});

test("버튼 클릭 시 로그인 성공하면 로그인 페이지로 이동", async () => {
  const { email, password, signupButton } = customRender();

  await act(async () => {
    await userEvent.type(email, USER.email);
    await userEvent.type(password, USER.password);
    await userEvent.click(signupButton);
  });

  expect(mockNavigate).toBeCalledWith("/signin");
});

test("회원가입 링크 클릭하면 회원가입 페이지로 이동", async () => {
  const user = userEvent.setup();
  render(<Signup />, { wrapper: BrowserRouter });
  const signupLink = screen.getByRole("link", { name: "로그인" });

  await act(async () => {
    await user.click(signupLink);
  });
  expect(window.location.pathname).toBe("/signin");
});
