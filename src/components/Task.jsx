// import React from "react";
/* eslint-disable react/prop-types */

const Task = ({ task }) => {
    
  return (
    <div key={task.id} id={task.id} className='mb-4 h-18 bg-card-bg rounded p-6 cursor-move'>
      <p>{task.content}</p>
    </div>
  );
};

export default Task;
