import React from "react";

const Task = ({ task,title,desc, exFun }) => {
  return (
    <div className="task">
      <h3>Title: {title}</h3>
      <p>Description: {desc}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <button className="taks_competed" onClick={exFun}>
        Finish
      </button>
    </div>
  );
};
export default Task;
