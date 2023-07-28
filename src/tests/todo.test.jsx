/* eslint-disable testing-library/no-unnecessary-act */
import { BrowserRouter } from "react-router-dom";
import Todo from "../pages/Todo";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItems from "../components/TodoItems";
import TodoList from "../components/TodoList";

describe("Todo", () => {
  function setup() {
    render(<Todo />, { wrapper: BrowserRouter });

    const todo = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("new-todo-add-button");
    return { todo, button };
  }

  it("Todo 페이지 렌더링", () => {
    const { todo, button } = setup();

    expect(todo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("입력창 초기 상태", () => {
    const { todo, button } = setup();

    expect(todo.value).toBe("");
    expect(button).toBeEnabled();
  });

  it("버튼 클릭 시 입력창에 값이 없으면 경고창", async () => {
    const { button } = setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    await userEvent.click(button);

    expect(alertSpy).toHaveBeenLastCalledWith("할일을 입력해주세요.");
  });

  //   it("버튼 클릭하면 Todo 생성하기", async () => {
  //     const { todo, button } = setup();

  //     const newTodoText = "시장장보기";

  //     await act(async () => {
  //       await userEvent.type(todo, newTodoText);
  //       await userEvent.click(button);
  //     });
  //     const todoItem = await screen.findByText((content, element) => {
  //       // content: 요소에 포함된 텍스트
  //       // element: 요소 자체
  //       return content === newTodoText;
  //     });

  //     // Check if the new todo is added to the list
  //     expect(todoItem).toBeInTheDocument();
  //   });
});

describe("TodoList", () => {
  const sampleTodoList = [
    {
      id: 0,
      todo: "숙제하기",
      isCompleted: true,
    },
    {
      id: 1,
      todo: "Velog 작성하기",
      isCompleted: true,
    },
  ];

  const setup = () => {
    const onDeleteHandler = jest.fn();

    render(
      <TodoList todoList={sampleTodoList} onDeleteHandler={onDeleteHandler} />
    );

    return { onDeleteHandler };
  };

  it("todos 렌더링 테스트", () => {
    setup();

    screen.getByText(sampleTodoList[0].todo);
    screen.getByText(sampleTodoList[1].todo);
  });

  it("onDeleteHandler 함수 테스트", async () => {
    const { onDeleteHandler } = setup();
    const removeButton = screen.getAllByRole("button", { name: "삭제" })[0];

    await userEvent.click(removeButton);
    expect(onDeleteHandler).toBeCalledWith(sampleTodoList[0].id);
  });
});

describe("TodoItems 수정하지 않는 경우", () => {
  const smapleTodo = {
    id: 0,
    text: "미팅하기",
    isCompleted: false,
  };

  const setup = (props) => {
    const onDeleteHandler = jest.fn();

    const initialProps = { todo: smapleTodo };
    const todo = props?.todo || initialProps.todo;

    render(
      <TodoItems
        todo={todo.text}
        id={todo.id}
        isCompleted={todo.isCompleted}
        onDeleteHandler={onDeleteHandler}
      />
    );

    const checkBox = screen.getByRole("checkbox");
    const label = screen.getByText(todo.text);
    const modifyButton = screen.getByRole("button", { name: "수정" });
    const removeButton = screen.getByRole("button", { name: "삭제" });

    return { checkBox, label, modifyButton, removeButton, onDeleteHandler };
  };

  it("checkbox, label, buttons 여부 및 초기 상태", () => {
    const { checkBox, label, modifyButton, removeButton } = setup();

    expect(checkBox).toBeTruthy();
    expect(label).toBeTruthy();
    expect(modifyButton).toBeTruthy();
    expect(removeButton).toBeTruthy();

    expect(checkBox).not.toBeChecked();
    expect(modifyButton).toBeEnabled();
    expect(removeButton).toBeEnabled();
  });

  it("onDeleteHandler 함수 실행 테스트", async () => {
    const { removeButton, onDeleteHandler } = setup();
    expect(removeButton).toBeTruthy();

    await userEvent.click(removeButton);
    expect(onDeleteHandler).toBeCalledWith(smapleTodo.id);
  });
});

describe("TodoItems 수정하는 경우", () => {});
