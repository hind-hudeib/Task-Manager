import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch todos from the API when the component mounts
    axios
      .get("http://localhost:5000/todos/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleAddTodo = () => {
    // Create a new todo and send it to the server
    axios
      .post("http://localhost:5000/todos/add", { text: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };
  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">Todo List</h1>
          <div class="flex mt-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
            />
            <button onClick={handleAddTodo} class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </div>
        </div>
        <div>
          {todos?.map((todo, index) => (
            <div key={index} className="flex mb-4 items-center">
              <p className="w-full text-grey-darkest">{todo.text}</p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
                Done
              </button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover-bg-red">
                Remove
              </button>
            </div>
          ))}

          <div class="flex mb-4 items-center">
            <p class="w-full line-through text-green">
              Submit Todo App Component to Tailwind Components
            </p>
            <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
              Not Done
            </button>
            <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
