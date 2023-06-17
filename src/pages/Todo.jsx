/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageHandler";
import { useRouter } from "../hooks/useRouter";
import { getTodo_API, createTodo_API, deleteTodo_API } from "../api/todoApi";
import TodoItem from "../components/TodoItems";

const Todo = () => {
  const { routeTo } = useRouter();
  const [todoList, setTodoLit] = useState([]);
  const [writeTodo, setWriteTodo] = useState("");

  useEffect(() => {
    if (!getLocalStorage("token")) {
      routeTo("/signin");
    }

    const getMyTodo = async () => {
      try {
        const response = await getTodo_API();
        if (response.status === 200) {
          setTodoLit(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMyTodo();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const newTodo = {
      todo: writeTodo,
    };

    try {
      const response = await createTodo_API(newTodo);

      if (response.status === 201) {
        setTodoLit([...todoList, response.data]);
        setWriteTodo("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = useCallback(async (id) => {
    try {
      const response = await deleteTodo_API(id);
      if (response.status === 204) {
        setTodoLit((prev) => [...prev].filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="todo-wrapper">
      <form className="todo-wrapper-write" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="todo"
          data-testid="new-todo-input"
          value={writeTodo}
          placeholder="해야할 일을 적어주세요."
          onChange={(e) => setWriteTodo(e.target.value)}
        />
        <button type="submit" data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      <ul className="todo-todoList">
        {todoList.map((todo) => (
          <TodoItem
            todo={todo.todo}
            id={todo.id}
            key={todo.id}
            isCompleted={todo.isCompleted}
            onDeleteHandler={onDeleteHandler}
          />
        ))}
      </ul>
    </section>
  );
};

export default Todo;
