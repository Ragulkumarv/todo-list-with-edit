import { useState, useEffect } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [inputVal, setInputVal] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save to localStorage whenever `todos` updates
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInputVal(e.target.value);
  };

  const handleAdd = () => {
    if (inputVal?.trim() === "") return;

    if (editIndex !== null) {
      // Update existing item
      setTodos((prev) =>
        prev.map((todo, index) => (index === editIndex ? inputVal : todo))
      );
      setEditIndex(null);
    } else {
      // Add new item
      setTodos([...todos, inputVal]);
    }
    setInputVal("");
  };

  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((todo, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInputVal(todos[index]);
    setEditIndex(index);
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-2">To do List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={inputVal}
            onChange={handleInput}
            placeholder="Add To Do's"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2"
          />
          <button
            className={`${
              editIndex !== null ? "bg-green-500" : "bg-blue-500"
            } hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded`}
            onClick={handleAdd}
          >
            {editIndex !== null ? "Update" : "Add +"}
          </button>
        </div>
        <ul>
          {todos?.map((item, index) => (
            <li
              key={index}
              className="flex justify-center gap-6 mb-2 w-1/2 items-center"
            >
              {item}
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
