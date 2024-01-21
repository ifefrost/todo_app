// import React from "react";
/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className='flex flex-col rounded-lg bg-column-bg w-[400px] h-[620px]'>
      <div className='flex items-center h-16 bg-column-header-bg rounded-t-lg px-6 mb-6'>
        <p className='text-lg font-semibold text-subtle-text'>{column.title}</p>
      </div>
      <div className={`flex px-6 flex-1 flex-col ${isOver?'bg-[#555555]':''}`} ref={setNodeRef}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
