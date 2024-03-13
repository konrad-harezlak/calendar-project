import React from "react";
import { useDrag } from "react-dnd";

const Task = ({id, title, desc, handleClick }) => {
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
      <button className="taks_completed" onClick={handleClick}>
        Finish
      </button>
    </div>
  );
};
export default Task;
