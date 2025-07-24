import { useState } from "react";
import { update_todo } from "../api/endpoints";

const Todo = ({ id, todo_name, completed, deleteTodo }) => {
  const [isChecked, setChecked] = useState(completed);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(todo_name);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setDeleting(true);
    await deleteTodo(id);
    setDeleting(false);
  };

  const handleComplete = async () => {
    await update_todo(id, !isChecked);
    setChecked(!isChecked);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = async () => {
    if (newName.trim() === "") {
      setNewName(todo_name);
      setEditing(false);
      return;
    }
    await update_todo(id, isChecked, newName);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setNewName(todo_name);
      setEditing(false);
    }
  };

  return (
    <div
      className="todo"
      style={{ padding: "12px 12px", borderBottom: "5px solid #ddd" }}
    >
      <div
        className="todo-container"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleComplete}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />

        {editing ? (
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ flexGrow: 1, fontSize: "16px", padding: "4px" }}
          />
        ) : (
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              color: isChecked ? "#777" : "#222",
              textDecoration: isChecked ? "line-through" : "none",
              flexGrow: 1,
            }}
          >
            {newName}
          </h3>
        )}

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-1 px-3 rounded transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 font-medium py-1 px-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
