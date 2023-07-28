import TodoItems from "./TodoItems";

const TodoList = ({ todoList, onDeleteHandler }) => {
  return (
    <ul className="todo-todoList" data-testid="test-List">
      {todoList.map((todo) => (
        <TodoItems
          todo={todo.todo}
          id={todo.id}
          key={todo.id}
          isCompleted={todo.isCompleted}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
    </ul>
  );
};

export default TodoList;
