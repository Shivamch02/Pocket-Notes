import React from "react";

const Notes = ({ notes }) => {
  return (
    <div className="w-full shadow-lg p-4 m-6">
      <p className="text-gray-950">{notes}</p>
      <div className="flex items-center justify-end p-4 pb-0">
        <span className="text-sm pr-2">9 Mar 2023</span> ●{" "}
        <span className="text-sm pl-2">10:10AM</span>
      </div>
    </div>
  );
};

export default Notes;
