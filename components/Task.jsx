import { useState } from "react";
import StepBar from "components/StepBar";
const Task = ({ task }) => {
  // I need the history for a task, we display it
  const [clicked, setClicked] = useState(false);
  return (
    <>
      {clicked ? (
        <div
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer bg-green-100 text-green-700 p-2 divide-x-2 divide-green-200 flex flex-row justify-between"
        >
          // Add one to history
          <button>Plus ONE</button>
        </div>
      ) : (
        <div
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer bg-green-100 text-green-700 p-2 divide-x-2 divide-green-200 flex flex-row justify-between"
        >
          <span key={task.id} className="">
            &#9679; {task.label}
          </span>
          <span className="ml-2">&nbsp;3/{task.repeat}</span>
        </div>
      )}
    </>
  );
};

export default Task;
