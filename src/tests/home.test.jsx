import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

test("Login 링크 클릭시 로그인 페이지로 이동", () => {
  render(<Home />, { wrapper: BrowserRouter });

  const loginLink = screen.getByRole("link", { name: /Login/i });
  fireEvent.click(loginLink);
  expect(window.location.pathname).toBe("/signin");
});

test("Signup 링크 클릭시 회원가입 페이지로 이동", () => {
  render(<Home />, { wrapper: BrowserRouter });

  const signupLink = screen.getByRole("link", { name: /Signup/i });
  fireEvent.click(signupLink);
  expect(window.location.pathname).toBe("/signup");
});

test("Todo 링크 클릭시 Todo 페이지로 이동", () => {
  render(<Home />, { wrapper: BrowserRouter });

  const todoLink = screen.getByRole("link", { name: /Todo/i });
  fireEvent.click(todoLink);
  expect(window.location.pathname).toBe("/todo");
});
