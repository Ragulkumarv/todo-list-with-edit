import { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos")) || [];
    } catch (error) {
      console.log(error, "error on localstorage fetch");
      return [];
    }
  });

  const [inputVal, setInputVal] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInputVal(e.target.value);
  };

  const handleAdd = () => {
    if (inputVal?.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      setTodos((prev) =>
        prev.map((todo, index) => (index === editIndex ? inputVal : todo))
      );
      setEditIndex(null);
    } else {
      setTodos([...todos, inputVal]);
    }
    setInputVal("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInputVal(todos[index]);
  };

  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((todo, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">
      <h1 className="font-bold text-2xl">To do List CRUD</h1>
      <div>
        <input
          type="text"
          placeholder="Add List"
          className="border rounded p-2 border-gray-500 mb-2
          "
          value={inputVal}
          onChange={(e) => handleInput(e)}
        />
        <button className="px-6 py-2 bg-amber-400" onClick={() => handleAdd()}>
          {editIndex !== null ? "Update" : "Add +"}
        </button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center">
              {todo}
              <div className="flex gap-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
