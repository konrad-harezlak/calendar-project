import React from "react";

const Task = ({ task, handleFinishTask }) => {
  return (
    <div className="task">
      <h1>Title: {task.title}</h1>
      <p>Description: {task.desc}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <button className="taks_competed" onClick={handleFinishTask()}>
        Finish
      </button>
    </div>
  );
};
export default Task;
