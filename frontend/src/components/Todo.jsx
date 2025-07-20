import { FiDelete } from "react-icons/fi";

const Todo = ({todo_list}) => {
  return (
    <div className="todo">
      <div className="todo-container">
        <input type="checkbox" />
        <h3>{todo_list}</h3>
        <FiDelete size="20px" />
      </div>
    </div>
  );
};

export default Todo;
