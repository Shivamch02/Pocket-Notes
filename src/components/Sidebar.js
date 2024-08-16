import React, { useState } from "react";
import MN from "../images/mn.png";
import Add from "../images/add.png";
import MainContent from "./MainContent";

const Sidebar = () => {
  const [group, setGroup] = useState([
    { id: 1, groupName: "My Notes", imgUrl: MN },
    { id: 2, groupName: "My Notes", imgUrl: MN },
    { id: 3, groupName: "My Notes", imgUrl: MN },
    { id: 4, groupName: "My Notes", imgUrl: MN },
    { id: 5, groupName: "My Notes", imgUrl: MN },
  ]);

  console.log(MN.data);

  return (
    <div className=" relative h-screen flex ">
      <div className="w-1/5 h-[100%] bg-white flex flex-col overflow-y-scroll">
        <div className="flex items-center text-3xl font-semibold py-8 px-8 justify-center">
          Pocket Notes
        </div>
        {group.map((item, index) => {
          return (
            <>
              <div
                className="flex justify-start items-center py-4 px-8 hover:bg-gray-300 cursor-pointer rounded-lg"
                key={index}
              >
                <img
                  className="h-10 w-10 rounded-3xl"
                  src={item.imgUrl}
                  alt="MN"
                />
                <div className="text-lg font-semibold pl-6">
                  {item.groupName}
                </div>
              </div>
            </>
          );
        })}
        <div className="sticky bottom-4 p-4">
          <img
            className="h-14 w-14 rounded-full float-right cursor-pointer"
            src={Add}
            alt="Add Grp"
          />
        </div>
      </div>
      <div className="absolute w-4/5 flex right-0 object-cover ">
        <MainContent />
      </div>
    </div>
  );
};

export default Sidebar;
