// import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: task.id});
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;
  return (
    <div key={task.id} ref={setNodeRef} style={style} {...listeners} {...attributes} className='mb-4 h-18 bg-card-bg rounded p-6 cursor-move'>
      <p>{task.content}</p>
    </div>
  );
};

export default Task;
