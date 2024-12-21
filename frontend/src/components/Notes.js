import React from "react";

const Notes = ({ notes, timeStamp }) => {
  return (
    <div className="md:w-[70%] shadow-lg md:p-4 p-2 md:m-4 m-3 bg-gray-700 rounded-lg">
      <p className="text-white">{notes}</p>
      <div className="flex items-center justify-end p-4 pb-0 text-gray-300">
        <span className="text-sm pr-2 ">
          {new Date(timeStamp).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>{" "}
        ●{" "}
        <span className="text-sm pl-2">
          {new Date(timeStamp)
            .toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/(\d+):(\d+)\s*(AM|PM)/, "$1:$2 $3")}
        </span>
      </div>
    </div>
  );
};

export default Notes;
