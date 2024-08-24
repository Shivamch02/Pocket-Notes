import React, { useState } from "react";
import { addGroup, selectGroup } from "../utils/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import Add from "../images/add.png";
import Modal from "./Modal";
import NotesPage from "./NotesPage";
import HomeImg from "../images/home.jpg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const groups = useSelector((store) => store.group.groups);
  const notes = useSelector((store) => store.group.notes);
  const selectedGroupId = useSelector((store) => store.group.selectedGroupId);

  const [groupText, setGroupText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddGroup = () => {
    dispatch(
      addGroup({
        id: Math.random().toFixed(3),
        groupName: groupText,
      })
    );
    closeModal();
    setGroupText("");
  };

  const handleSelectGroup = (groupId) => {
    dispatch(selectGroup({ groupId }));
  };

  const selectedGroup = groups?.find((group) => group.id === selectedGroupId);
  const selectedGroupNotes = notes?.filter(
    (note) => note.groupId === selectedGroupId
  );

  return (
    <div className="relative h-screen flex">
      {/* Sidebar */}
      <div
        className={`${
          selectedGroup ? "hidden md:flex" : "flex"
        } xl:w-[20%] md:w-[30%] w-full h-[100%] bg-teal-400 flex-col overflow-y-scroll`}
      >
        <div className="flex items-center text-xl xl:text-3xl font-semibold py-8 px-8 justify-center">
          Pocket Notes
        </div>
        {groups?.map((group) => (
          <div
            className="flex justify-start items-center py-4 px-8 hover:bg-gray-300 cursor-pointer rounded-lg"
            key={group?.id}
            onClick={() => handleSelectGroup(group?.id)}
          >
            <div className="h-11 w-11 rounded-3xl bg-pink-600 flex justify-center items-center">
              <span className="flex justify-center items-center text-white">
                {group?.groupName.charAt(0).toUpperCase()}
                {group?.groupName.split(" ")[1] &&
                group?.groupName.split(" ")[1].charAt(0)
                  ? group?.groupName.split(" ")[1].charAt(0)
                  : "G"}
              </span>
            </div>
            <div className="text-sm xl:text-lg font-semibold pl-4 xl:pl-6">
              {group?.groupName}
            </div>
          </div>
        ))}
        <div className="fixed p-4 bottom-4 left-36 lg:left-48">
          <img
            onClick={openModal}
            className="h-14 w-14 rounded-full cursor-pointer"
            src={Add}
            alt="Add Group"
          />
        </div>
      </div>

      {/* Notes Page */}
      <div
        className={`${
          selectedGroup ? "flex" : "hidden md:flex"
        } xl:w-[80%] md:w-[70%] w-full h-full right-0 object-cover`}
      >
        {selectedGroup ? (
          <NotesPage
            groupName={selectedGroup.groupName}
            notes={selectedGroupNotes}
            groupId={selectedGroup.id}
          />
        ) : (
          <div className="hidden md:flex w-full justify-end">
            <img className="w-4/5" src={HomeImg} alt="Home" />
          </div>
        )}
      </div>

      {/* Modal for Adding Groups */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        <span className="text-lg font-semibold">Group Name</span>
        <input
          className="ml-4 border border-gray-400 px-2 py-1 rounded-xl"
          type="text"
          value={groupText}
          onChange={(e) => setGroupText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddGroup();
            }
          }}
        />
        <button
          className="ml-2 px-2 py-1 bg-blue-700 text-white rounded-lg text-center"
          onClick={handleAddGroup}
        >
          Create
        </button>
      </Modal>
    </div>
  );
};

export default Sidebar;
