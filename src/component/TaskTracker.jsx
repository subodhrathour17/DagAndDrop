import { useState } from "react";
import data from "../Data.json";

function TaskTracker() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
  }

  function dragging(event) {
    console.log(event);
    // document.getElementById("demo").innerHTML = "The item is being dragged";
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    // document.getElementById("demo").innerHTML = "The item was dropped";
  }

  const handlePop = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      {/* <div>Button Add Task</div> */}
      <div className='flex justify-center items-center m-4 h-screen'>
        <div className='flex w-full max-w-7xl gap-10 p-1 h-screen'>
          <div
            id='todo'
            className='droptarget basis-1/2 bg-neutral-100 p-1 pb-4 h-screen snap-y  '
            onDrop={drop}
            onDragOver={allowDrop}
          >
            TO DO
            {data.map((item, index) => {
              return (
                <div
                  id={`item-${index}`}
                  className='item  bg-white m-2 p-2 rounded '
                  key={index}
                  onClick={() => handlePop(item)}
                  onDragStart={dragStart}
                  onDrag={dragging}
                  draggable='true'
                >
                  <p>{item.fields.assignee.name}</p>
                  <p>{item.fields.summary}</p>
                  <p>{item.fields.priority.name}</p>
                  <p>{item.fields.duedate}</p>
                </div>
              );
            })}
          </div>

          <div
            id='in-progress'
            className='basis-1/2  bg-neutral-100 p-1 pb-4 h-screen'
            onDrop={drop}
            onDragOver={allowDrop}
          >
            IN PROGRESS
          </div>
          <div
            id='in-review'
            className='basis-1/2  bg-neutral-100 p-1 pb-4 h-screen'
            onDrop={drop}
            onDragOver={allowDrop}
          >
            IN REVIEW
          </div>
          <div
            id='done'
            className='basis-1/2  bg-neutral-100 p-1 pb-4 h-screen'
            onDrop={drop}
            onDragOver={allowDrop}
          >
            DONE
          </div>
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>Task Details</h2>
            <p>
              <strong>Assignee:</strong> {selectedTask.fields.assignee.name}
            </p>
            <p>
              <strong>Summary:</strong> {selectedTask.fields.summary}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTask.fields.priority.name}
            </p>
            <p>
              <strong>Due Date:</strong> {selectedTask.fields.duedate}
            </p>
            <button
              className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskTracker;
