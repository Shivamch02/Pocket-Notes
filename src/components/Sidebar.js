import React, { useState } from "react";
import MN from "../images/mn.png";
import Add from "../images/add.png";
import MainContent from "./MainContent";
import Modal from "./Modal";
import NotesPage from "./NotesPage";

const Sidebar = () => {
  const [group, setGroup] = useState([
    { id: 1, groupName: "My Notes", imgUrl: MN, notes: ["A", "b", "c"] },
    { id: 2, groupName: "My Notes", imgUrl: MN, notes: ["A", "b"] },
    { id: 3, groupName: "My Notes", imgUrl: MN, notes: ["A", "c"] },
    { id: 4, groupName: "My Notes", imgUrl: MN, notes: ["A", "b", "c"] },
    { id: 5, groupName: "My Notes", imgUrl: MN, notes: ["b", "c"] },
  ]);

  const [groupName, setGroupName] = useState("");
  console.log(groupName);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showComponent, setShowComponent] = useState(false);
  const [data, setData] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateGroup = () => {
    setGroup([
      ...group,
      {
        id: groupName + Math.floor(Math.random()),
        groupName: groupName,
        imgUrl: MN,
      },
    ]);
    setGroupName("");
  };

  const handleShowNotesPage = (item) => {
    setData({
      imgUrl: item.imgUrl,
      groupName: item.groupName,
      notes: item.notes,
    });
    setShowComponent(true);
  };

  return (
    <div className=" relative h-screen flex">
      <div className="w-[20%] h-[100%] bg-white flex flex-col overflow-y-scroll">
        <div className="flex items-center text-3xl font-semibold py-8 px-8 justify-center">
          Pocket Notes
        </div>
        {group.map((item, index) => {
          return (
            <div
              className="flex justify-start items-center py-4 px-8 hover:bg-gray-300 cursor-pointer rounded-lg"
              key={index}
              onClick={() => handleShowNotesPage(item)}
            >
              <img
                className="h-10 w-10 rounded-3xl"
                src={item.imgUrl}
                alt="MN"
              />
              <div className="text-lg font-semibold pl-6">{item.groupName}</div>
            </div>
          );
        })}
        <div className="sticky bottom-4 p-4">
          <img
            onClick={openModal}
            className="h-14 w-14 rounded-full float-right cursor-pointer"
            src={Add}
            alt="Add Grp"
          />
        </div>
      </div>
      <div className="absolute w-[80%] flex right-0 object-cover ">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
          <span className="text-lg font-semibold">Group Name</span>
          <input
            className="ml-4 border border-gray-400 px-2 py-1 rounded-xl"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button
            className="ml-2 px-2 py-1 bg-blue-700 text-white rounded-lg text-center"
            onClick={handleCreateGroup}
          >
            Create
          </button>
        </Modal>
        {showComponent ? (
          <NotesPage
            imgUrl={data.imgUrl}
            groupName={data.groupName}
            notes={data.notes}
          />
        ) : (
          <MainContent />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
