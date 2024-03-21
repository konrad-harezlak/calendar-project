import React from "react";
import { useDrag } from "react-dnd";

const Task = ({id, title, desc, handleClick,complete,handleEnd }) => {
  const ItemTypes = {
    CARD: "card",
  };
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [title]
  );
  return (
    <div className="task" ref={dragRef} style={{opacity}}>
      <h3>Title: {title}</h3>
      <p>Description: {desc}</p>
      <button className="task_completed" onClick={handleClick}>
        {complete!== 1 ? "Finish" : "Resume"}
      </button>
      
        {typeof handleEnd==='function' ? (<button className="task_end" onClick={handleEnd}>Delete</button>) : ("")}
      
    </div>
  );
};
export default Task;
