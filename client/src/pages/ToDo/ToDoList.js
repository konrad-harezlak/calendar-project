import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import axios from "../../api";
import Task from "./Task";
import "./toDoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTasks } from "@fortawesome/free-solid-svg-icons";
const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  useEffect(() => {
    fetchTasks();
  });
  const fetchTasks = async () => {
    try {
      let response = await axios.get("/tasks");
      console.log(response);
    } catch (err) {
      console.error("Error occured while  fetching tasks: ", err);
    }

    //setTasks(response.data);
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      console.log(task);
      setTasks([...tasks, task]);
      setTask({});
    } catch (err) {
      console.error("Error occured while adding the task: ", err);
    }
  };
  const handleFinishTask = (taskId) => {};

  return (
    <div className="todo_page">
      <Navigation />
      <div className="todo_container">
        <div className="task_list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={faTasks}
                onClick={handleFinishTask(task.id)}
              />
            ))
          ) : (
            <h1>Your todo list is Empty!</h1>
          )}
        </div>
        <div className="task_input">
            <h2>Add task!</h2>
          <form>
            <label for='title'>Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask.title(e.target.value)}
            ></input>
            <label for='description'>Description:</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={task.description}
              onChange={(e) => setTask.description(e.target.value)}
            ></input>
            <button onClick={(e) => handleAddTask(e)}>
              <FontAwesomeIcon className="font" icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Todo;
