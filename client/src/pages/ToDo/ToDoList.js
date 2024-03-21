import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import Navigation from "../Navigation/Navigation";
import axios from "../../api";
import Task from "./Task";
import "./toDoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
const Todo = () => {
  const ItemTypes = {
    CARD: "card",
  };
  const [isSwitchOn, setIsSwtichOn] = useState(false);
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
      console.log(response.data);
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
    fetchTasks();
  };
  const delTask = async (taskId) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(newTasks);
      setTasks(newTasks);
      console.log("Task status changed successfully:", response.data);
    } catch (error) {
      console.error("Error occured while changing task status:", error);
    }
  };
  const changeStatus = async (newStatus, itemId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === itemId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/tasks/${itemId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTasks(newTasks);
      console.log("Task status changed successfully:", response.data);
    } catch (error) {
      console.error("Error occured while changing task status:", error);
    }
  };
  const [, drop4] = useDrop({
    accept: ItemTypes.CARD,
    drop: async (item, monitor) => {
      changeStatus(4, item.id);
    },
  });

  const [, drop3] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      changeStatus(3, item.id);
    },
  });
  const [, drop2] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      changeStatus(2, item.id);
    },
  });
  const [, drop1] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      changeStatus(1, item.id);
    },
  });
  const [, drop0] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      changeStatus(0, item.id);
    },
  });
  const [, drop5] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      changeStatus(-1, item.id);
    },
  });

  return (
    <div className="todo_page">
      <Navigation />
      <div className="todo_container">
        <div className="task_container">
          <div className="assigned_tasks">
            <div className="switch">
              <input
                type="checkbox"
                checked={isSwitchOn}
                onChange={() => {
                  setIsSwtichOn(!isSwitchOn);
                  fetchTasks();
                }}
                id="switch"
              />
              <label htmlFor="switch">Toggle</label>
            </div>
            {isSwitchOn ? (
              <div className="task-grid-container">
                <div className="grid-container">
                  <div className="grid-item-1"></div>
                  <div className="grid-item">
                    <h3>NOT URGENT</h3>
                  </div>
                  <div className="grid-item">
                    <h3>URGENT</h3>
                  </div>
                  <div className="grid-item-1">
                    <h3>IMPORTANT</h3>
                  </div>
                  <div className="grid-item" ref={drop2}>
                    {tasks
                      .filter((task) => task.status === 2)
                      .map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          desc={task.description}
                          handleClick={() => changeStatus(-1, task.id)}
                        />
                      ))}
                  </div>
                  <div className="grid-item" ref={drop4}>
                    {tasks
                      .filter((task) => task.status === 4)
                      .map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          desc={task.description}
                          handleClick={() => changeStatus(-1, task.id)}
                        />
                      ))}
                  </div>
                  <div className="grid-item-1">
                    <h3>LESS IMPORTANT</h3>
                  </div>
                  <div className="grid-item" ref={drop1}>
                    {tasks
                      .filter((task) => task.status === 1)
                      .map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          desc={task.description}
                          handleClick={() => changeStatus(-1, task.id)}
                        />
                      ))}
                  </div>
                  <div className="grid-item" ref={drop3}>
                    {tasks
                      .filter((task) => task.status === 3)
                      .map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          desc={task.description}
                          handleClick={() => changeStatus(-1, task.id)}
                        />
                      ))}
                  </div>
                </div>
                <div className="unassigned_tasks" ref={drop0}>
                  {tasks
                    .filter((task) => task.status === 0)
                    .map((task) => (
                      <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                  <div className="completed_tasks" ref={drop5}>
                    {tasks
                      .filter((task) => task.status === -1)
                      .map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          desc={task.description}
                          handleClick={() => changeStatus(0, task.id)}
                          handleEnd={() => delTask(task.id)}
                          complete={1}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="task_list">
                <div ref={drop4}>
                  <h2>IMPORTANT & URGENT</h2>
                  {tasks
                    .filter((task) => task.status === 4)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                </div>
                <div ref={drop3}>
                  <h2>URGENT</h2>
                  {tasks
                    .filter((task) => task.status === 3)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                </div>
                <div ref={drop2}>
                  <h2>IMPORTANT</h2>
                  {tasks
                    .filter((task) => task.status === 2)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                </div>
                <div ref={drop1}>
                  <h2>NOT IMPORTANT & NOT URGENT</h2>
                  {tasks
                    .filter((task) => task.status === 1)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                </div>
                <div ref={drop0}>
                  <h2>UNASSIGNED</h2>
                  {tasks
                    .filter((task) => task.status === 0)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                      />
                    ))}
                </div>
                <div className="completed_tasks" ref={drop5}>
                  <h2>COMPLETED</h2>
                  {tasks
                    .filter((task) => task.status === -1)
                    .map((task, index) => (
                      <Task
                        key={index}
                        id={task.id}
                        title={task.title}
                        desc={task.description}
                        handleClick={() => changeStatus(-1, task.id)}
                        complete={1}
                        handleEnd={() => delTask(task.id)}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="task_input">
          <h2>Add task!</h2>

          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={task.title}
              name="title"
              onChange={handleChangeTask}
            ></input>
            <label htmlFor="description">Description:</label>
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
