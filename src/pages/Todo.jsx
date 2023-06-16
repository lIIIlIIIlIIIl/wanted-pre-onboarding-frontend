/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageHandler";
import { useRouter } from "../hooks/useRouter";
import { getTodo_API, postTodo_API } from "../api/todoApi";

const Todo = () => {
  const { routeTo } = useRouter();
  const [todoList, setTodoLit] = useState([]);

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
    const formData = new FormData(event.currentTarget);

    const newTodo = {
      todo: formData.get("todo"),
    };

    try {
      const response = await postTodo_API(newTodo);

      if (response.status === 201) {
        setTodoLit([response.data, ...todoList]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="todo-wrapper">
      <form className="todo-wrapper-write" onSubmit={onSubmitHandler}>
        <input type="text" name="todo" data-testid="new-todo-input" />
        <button type="submit" data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      <ul></ul>
    </section>
  );
};

export default Todo;
