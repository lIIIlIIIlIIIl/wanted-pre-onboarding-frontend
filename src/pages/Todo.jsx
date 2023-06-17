/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageHandler";
import { useRouter } from "../hooks/useRouter";
import { getTodo_API, createTodo_API, deleteTodo_API } from "../api/todoApi";
import TodoItem from "../components/TodoItems";

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
      const response = await createTodo_API(newTodo);

      if (response.status === 201) {
        setTodoLit([response.data, ...todoList]);
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
        <input type="text" name="todo" data-testid="new-todo-input" />
        <button type="submit" data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      {todoList.length === 0 ? (
        <div>작성된 내용이 없습니다.</div>
      ) : (
        <ul>
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
      )}
    </section>
  );
};

export default Todo;
