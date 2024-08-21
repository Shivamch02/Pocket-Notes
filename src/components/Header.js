import React from "react";
import MN from "../images/mn.png";

const Header = ({ imgUrl, groupName }) => {
  return (
    <div className="flex items-center ">
      <div className="logo top-0">
        <img className="h-11 w-11 rounded-3xl" src={imgUrl} alt="MN" />
      </div>

      <div className="px-2 text-white">{groupName}</div>
    </div>
  );
};

export default Header;
