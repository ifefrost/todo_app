import { DndContext } from "@dnd-kit/core";
import "./App.css";
import Column from "./components/Column";
import { useState } from "react";

function App() {
  const [data, setData] = useState(initialData);

  const onDragStart = (event) => {
    const { active } = event;
    for (const columnId in data.columns) {
      if (data.columns[columnId].taskIds.includes(active.id)) {
        active.data["columnId"] = columnId;
      }
    }
  };

  const onDragEnd = (event) => {
    console.log(event);
    const { active, over } = event;
    if (!over) return;
    setData((currentData) => {
      const column = currentData.columns[over.id];
      const oldColumn = active.data.columnId;
      const newTaskIds = [...column.taskIds, event.active.id];
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      const newData = {
        ...currentData,
        columns: {
          ...currentData.columns,
          [oldColumn]: {
            ...currentData.columns[oldColumn],
            taskIds: currentData.columns[oldColumn].taskIds.filter(
              (taskId) => taskId !== active.id
            ),
          },
          [over.id]: newColumn,
        },
      };
      return newData;
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className='flex flex-col bg-main-bg min-h-screen w-full text-white-text pb-4'>
        <div className='flex flex-col items-center my-16'>
          <h2 className='text-3xl font-semibold'>Todo List App</h2>
          <p className='font-semibold text-xl text-subtle-text'>
            Organise your life with lists
          </p>
        </div>
        <div className='flex gap-8 px-16'>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </div>
    </DndContext>
  );
}

const initialData = {
  tasks: {
    1: { id: 1, content: "Take out the garbage" },
    2: { id: 2, content: "Watch my favorite show" },
    3: { id: 3, content: "Charge my phone" },
    4: { id: 4, content: "Cook dinner" },
    5: { id: 5, content: "Cook dinner5" },
    6: { id: 6, content: "Cook dinner6" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "ToDo",
      taskIds: [1, 2, 3, 4],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [5, 6],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default App;
