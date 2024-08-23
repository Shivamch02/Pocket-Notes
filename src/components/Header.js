import React from "react";

const Header = ({ groupName }) => {
  return (
    <div className="flex items-center ">
      <div className="top-0">
        <div className="h-11 w-11 rounded-3xl bg-pink-600 flex justify-center items-center">
          <span className="flex justify-center items-center">
            {groupName.charAt(0).toUpperCase()}
            {groupName.split(" ")[1] && groupName.split(" ")[1].charAt(0)
              ? groupName.split(" ")[1].charAt(0)
              : "G"}
          </span>
        </div>
      </div>

      <div className="px-2 text-white">{groupName}</div>
    </div>
  );
};

export default Header;
