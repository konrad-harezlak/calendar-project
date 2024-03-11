import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import axios from "../../api";
import Task from "./Task";
import "./toDoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTasks } from "@fortawesome/free-solid-svg-icons";
const Todo = () => {
  const [isSwitchOn, setIsSwtichOn] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ id: "", title: "", description: "" });
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get("/tasks", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Error occured while  fetching tasks: ", err);
    }
  };
  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      id: "id" + Math.random().toString(16).slice(2),
      [name]: value,
    }));
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task.title.length > 0) {
      const newTask = {
        ...task,
        id: "id" + Math.random().toString(16).slice(2),
      };
      const token = localStorage.getItem("token");

      try {
        axios.post("/tasks", newTask, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTasks([...tasks, task]);
        setTask({ title: "", description: "" });
      } catch (err) {
        console.error("Error occured while adding the task: ", err);
      }
    } else {
      alert("Title can't be empty!");
    }
  };
  const handleFinishTask = (taskId) => {
    console.log(taskId);
  };

  return (
    <div className="home_page">
      <Navigation />
      <div className="todo_container">
        <div className="task_container">
          <div className="assigned_tasks">
            <div className="switch">
              <input
                type="checkbox"
                checked={isSwitchOn}
                onChange={() => setIsSwtichOn(!isSwitchOn)}
                id="switch"
              />
              <label for="switch">Toggle</label>
            </div>
            {isSwitchOn ? (
              <div class="task-grid-container">
                <div class="grid-container">
                  <div class="grid-item-1"></div>
                  <div class="grid-item">
                    <h3>NOT URGENT</h3>
                  </div>
                  <div class="grid-item">
                    <h3>URGENT</h3>
                  </div>
                  <div class="grid-item-1">
                    <h3>IMPORTANT</h3>
                  </div>
                  <div class="grid-item">5</div>
                  <div class="grid-item">6</div>
                  <div class="grid-item-1">
                    <h3>LESS IMPORTANT</h3>
                  </div>
                  <div class="grid-item">8</div>
                  <div class="grid-item">9</div>
                </div>
                <div className="unassigned_tasks">
                  {tasks
                    .filter((task) => task.isCompleted === 0)
                    .map((task) => (
                      <Task
                        key={task.id}
                        task={faTasks}
                        title={task.title}
                        desc={task.description}
                        onClick={() => handleFinishTask(task.id)}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <div className="task_list">
                {tasks.filter((task) => task.isCompleted === 4).length > 0 && (
                  <div>
                    <h2>IMPORTANT & URGENT</h2>
                    {tasks
                      .filter((task) => task.isCompleted === 4)
                      .map((task, index) => (
                        <div className="task" key={index}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      ))}
                  </div>
                )}
                {tasks.filter((task) => task.isCompleted === 3).length > 0 && (
                  <div>
                    <h2>URGENT</h2>
                    {tasks
                      .filter((task) => task.isCompleted === 3)
                      .map((task, index) => (
                        <div className="task" key={index}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      ))}
                  </div>
                )}
                {tasks.filter((task) => task.isCompleted === 2).length > 0 && (
                  <div>
                    <h2>IMPORTANT</h2>
                    {tasks
                      .filter((task) => task.isCompleted === 2)
                      .map((task, index) => (
                        <div className="task" key={index}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      ))}
                  </div>
                )}
                {tasks.filter((task) => task.isCompleted === 1).length > 0 && (
                  <div>
                    <h2>NOT IMPORTANT & NOT URGENT</h2>
                    {tasks
                      .filter((task) => task.isCompleted === 1)
                      .map((task, index) => (
                        <div className="task" key={index}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      ))}
                  </div>
                )}
                {tasks.filter((task) => task.isCompleted === 0).length > 0 && (
                  <div>
                    <h2>UNASSIGNED</h2>
                    {tasks
                      .filter((task) => task.isCompleted === 0)
                      .map((task, index) => (
                        <div className="task" key={index}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="task_input">
          <h2>Add task!</h2>

          <form>
            <label for="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={task.title}
              name="title"
              onChange={handleChangeTask}
            ></input>
            <label for="description">Description:</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={task.description}
              name="description"
              onChange={handleChangeTask}
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
