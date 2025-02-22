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
      <h1 className="font-bold text-2xl mb-4">To do List CRUD</h1>
      <div>
        <input
          type="text"
          placeholder="Add List"
          className="border rounded-lg px-6 py-2 mr-2 border-gray-400 mb-2
          "
          value={inputVal}
          onChange={(e) => handleInput(e)}
        />
        <button
          className={`px-6 py-2 rounded-lg  cursor-pointer hover:bg-gray-200 ${
            editIndex !== null ? "bg-green-500" : "bg-amber-400"
          }`}
          onClick={() => handleAdd()}
        >
          {editIndex !== null ? "Update" : "Add +"}
        </button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex w-full items-center justify-start">
              <div className="flex w-full gap-2 justify-between">
                <span className="flex-grow truncate">{todo}</span>
                <button
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 cursor-pointer hover:underline"
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
