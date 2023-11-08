import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        const todosWithDoneStatus = response.data.map((todo) => ({
          ...todo,
          done: false,
        }));
        setTodos(todosWithDoneStatus);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);
  




  const handleAddTodo = (e) => {
    e.preventDefault();
    // Create a new todo and send it to the server
    axios
      .post("http://localhost:5000/todos", { text: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  const handleTaskDone = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
      axios
      .put(`http://localhost:5000/done/${id}`, { done: !updatedTodos.done })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
  

  const handleTaskRemove = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then((response) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("Error removing todo:", error);
      });
  };


  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <form onSubmit={handleAddTodo}>
              <input
                onChange={handleChange}
                value={newTodo}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                type="submit"
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              >
                Add
              </button>
            </form>
          </div>
        </div>
        <div>
          {todos?.map((todo, index) => (
            <div key={index} className="flex mb-4 items-center">
              <p
                className={`w-full text-grey-darkest ${todo.done ? "line-through text-green" : ""
                  }`}
              >
                {todo.text}
              </p>
              <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                onClick={() => handleTaskDone(todo.id)}
              >
                Done
              </button>
              <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover-bg-red"
                onClick={() => handleTaskRemove(todo.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
