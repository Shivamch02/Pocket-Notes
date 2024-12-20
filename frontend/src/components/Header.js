import React from "react";

const Header = ({ title }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className="h-11 w-11 rounded-3xl bg-pink-600 flex justify-center items-center">
          <span className="flex justify-center items-center text-white">
            {title.charAt(0).toUpperCase()}
            {title.split(" ")[1] && title.split(" ")[1].charAt(0)
              ? title.split(" ")[1].charAt(0)
              : "G"}
          </span>
        </div>
        <div className="px-2 text-white col-span-8">{title}</div>
      </div>
    </div>
  );
};

export default Header;
