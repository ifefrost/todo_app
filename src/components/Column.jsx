/* eslint-disable react/prop-types */
import {
  SortableContext, useSortable,
} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Task from "./Task";

const Column = ({ column, tasks, id }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: id});
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
  return (
    <div className='flex flex-col rounded-lg bg-column-bg w-[400px] h-[620px]' ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='flex items-center h-16 bg-column-header-bg rounded-t-lg px-6 mb-6 cursor-move'>
        <p className='text-lg font-semibold text-subtle-text'>{column.title}</p>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
      >
        <div
          className={`flex px-6 flex-1 flex-col`}
        >
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
