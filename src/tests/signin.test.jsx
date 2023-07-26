import { act, render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Todo from "../pages/Todo";

test("버튼과 입력창 초기 상태", () => {
  render(<Login />, { wrapper: BrowserRouter });
  const emailInput = screen.getByRole("textbox", { name: "아이디" });
  const passwordInput = screen.getByRole("textbox", { name: "비밀번호" });
  const loginButton = screen.getByRole("button", { name: "로그인" });
  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");

  expect(loginButton).toBeDisabled();
});

test("이메일에 '@'가 포함되고 비밀번호의 길이가 8이 넘는 경우 버튼 활성화", async () => {
  const user = userEvent.setup();

  render(<Login />, { wrapper: BrowserRouter });
  const emailInput = screen.getByRole("textbox", { name: "아이디" });
  const passwordInput = screen.getByRole("textbox", { name: "비밀번호" });
  const loginButton = screen.getByRole("button", { name: "로그인" });

  expect(loginButton).toBeDisabled();

  await act(async () => {
    await user.type(emailInput, "snsn@naver.com");
    await user.type(passwordInput, "12345678");
  });

  expect(loginButton).toBeEnabled();
});

test("버튼 클릭 시 로그인 성공하면 Todo 페이지로 이동", async () => {
  const user = userEvent.setup();

  render(
    <>
      <Login />
      <Todo />
    </>,
    { wrapper: BrowserRouter }
  );
  const emailInput = screen.getByRole("textbox", { name: "아이디" });
  const passwordInput = screen.getByRole("textbox", { name: "비밀번호" });
  const loginButton = screen.getByRole("button", { name: "로그인" });

  await act(async () => {
    await user.type(emailInput, "snsn@naver.com");
    await user.type(passwordInput, "12345678");
  });

  await act(async () => {
    await user.click(loginButton);
  });

  expect(screen.getByTestId(/new-todo-input/i)).toBeInTheDocument();
});

test("회원가입 링크 클릭하면 회원가입 페이지로 이동", async () => {
  const user = userEvent.setup();
  render(<Login />, { wrapper: BrowserRouter });
  const signupLink = screen.getByRole("link", { name: "회원가입" });
  await act(async () => {
    await user.click(signupLink);
    expect(window.location.pathname).toBe("/signup");
  });
});
