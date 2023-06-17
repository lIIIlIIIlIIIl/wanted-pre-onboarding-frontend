import React, { useState } from "react";
import { updateTodo_API } from "../api/todoApi";

const TodoItem = ({ todo, id, isCompleted, onDeleteHandler }) => {
  const [isModify, setIsModify] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [chageTodo, setChageTodo] = useState(todo);

  const onCompletHandler = async () => {
    const body = { todo: chageTodo, isCompleted: !isChecked };
    try {
      const response = await updateTodo_API(id, body);
      if (response.status === 200) {
        setIsChecked((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onModifyHandler = () => {
    setIsModify((prev) => !prev);
  };

  const onSubmitHandler = async () => {
    const body = { todo: chageTodo, isCompleted: isChecked };
    try {
      const response = await updateTodo_API(id, body);
      if (response.status === 200) {
        onModifyHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModify ? (
        <li>
          <label>
            <input
              type="checkbox"
              onChange={onCompletHandler}
              checked={isChecked ? "checked" : ""}
            />
            <input
              data-testid="modify-input"
              value={chageTodo}
              onChange={(e) => setChageTodo(e.target.value)}
            />
          </label>
          <button data-testid="submit-button" onClick={onSubmitHandler}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={onModifyHandler}>
            취소
          </button>
        </li>
      ) : (
        <li>
          <label>
            <input
              type="checkbox"
              onChange={onCompletHandler}
              checked={isChecked ? "checked" : ""}
            />
            <span>{chageTodo}</span>
          </label>
          <button data-testid="modify-button" onClick={onModifyHandler}>
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => onDeleteHandler(id)}
          >
            삭제
          </button>
        </li>
      )}
    </>
  );
};

export default React.memo(TodoItem);
