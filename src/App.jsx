import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
} from "@dnd-kit/sortable";
import "./App.css";
import Column from "./components/Column";
import { useState } from "react";

function App() {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(data.columnOrder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event) => {
    console.log(event);
    console.log(columns);
    console.log(data);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColumns((columns) => {
        const oldIndex = columns.indexOf(active.id);
        const newIndex = columns.indexOf(over.id);
        return arrayMove(columns, oldIndex, newIndex);
      });
      setData((data) => {
        const newData = { ...data, columnOrder: columns };
        console.log(newData);
        return newData;
      });
    }
  };
  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className='flex flex-col bg-main-bg min-h-screen w-full text-white-text pb-4 overflow-hidden'>
        <div className='flex flex-col items-center my-16'>
          <h2 className='text-3xl font-semibold'>Todo List App</h2>
          <p className='font-semibold text-xl text-subtle-text'>
            Organise your life with lists
          </p>
        </div>
        <div className='flex items-center'>
          <div className='flex gap-8 px-16'>
            <SortableContext items={columns}>
              {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => data.tasks[taskId]
                );
                return (
                  <Column
                    key={column.id}
                    id={column.id}
                    column={column}
                    tasks={tasks}
                  />
                );
              })}
            </SortableContext>
          </div>
          <div className='flex justify-center items-center h-16 w-16 rounded-full bg-column-bg text-white-text text-3xl border-column-header-bg border-2 cursor-pointer'>
            +
          </div>
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
