import React from "react";

const StepBar = ({ step, total }) => {
  const totalArray = Array.from(Array(total));
  // find the x size for the end of green, start of grey
  const stepXLimit = ((step - 1) * 95) / (total - 1) + 2;
  return (
    <div>
      <svg
        viewBox="0 0 100 10"
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={`2%`} y1="5" x2="98%" y2="5" stroke="lightgray" />
        <line x1="2" y1="5" x2={`${stepXLimit}%`} y2="5" stroke="lightgreen" />
        {totalArray.map((i, index) => {
          console.log("index", index + 1);
          const color = index <= step - 1 ? "lightgreen" : "lightgrey";
          const x = (index * 95) / (total - 1) + 2;
          return (
            <circle
              id="green-circle"
              r="1"
              cx={`${x}%`}
              cy="5"
              fill={`${color}`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default StepBar;
