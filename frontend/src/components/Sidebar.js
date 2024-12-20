import React, { useEffect, useState } from "react";
import Add from "../images/add.png";
import Modal from "./Modal";
import NotesPage from "./NotesPage";
import HomeImg from "../images/home.jpg";
import axios from "axios";

const Sidebar = () => {
  const [notes, setNotes] = useState([]);
  const [groupText, setGroupText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedChats, setSelectedChats] = useState([]);
  const [state, setState] = useState(false);
  // Fetch all notes/groups on component moun

  // Fetch all notes/groups
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setGroupText("");
  };

  // Add a new group
  const handleAddGroup = async () => {
    if (!groupText.trim()) {
      alert("Group name cannot be empty.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/notes", {
        title: groupText,
      });
      setNotes((prevNotes) => [...prevNotes, response.data]);
      setState(!state);
      closeModal();
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  // Handle selecting a group
  // Handle selecting a group
  const handleSelectGroup = async (groupId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/notes/${groupId}`
      );

      // Check if response.data.note exists before accessing title
      if (response.data?.note) {
        const note = response.data.note;
        setSelectedGroup(note); // Update state with the title
        setState(!state);

        // Fetch related chats after setting the group
        fetchChats(groupId);
      } else {
        console.error("No note found in response:", response.data);
      }
    } catch (error) {
      console.error("Error selecting group:", error);
    }
  };

  useEffect(() => {
    // Log selectedGroup after it has been updated
    fetchNotes();
    console.log("Updated selectedGroup:", selectedGroup);
  }, [selectedGroup, state]); // This will run every time selectedGroup changes

  // Fetch chats for a group
  const fetchChats = async (groupId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chats/${groupId}`
      );
      setSelectedChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

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
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex justify-start items-center py-4 px-8 hover:bg-gray-300 cursor-pointer rounded-lg"
            onClick={() => handleSelectGroup(note._id)}
          >
            <div className="h-11 w-11 rounded-3xl bg-pink-600 flex justify-center items-center">
              <span className="text-white">
                {note.title
                  ? `${note.title.charAt(0).toUpperCase()}${
                      note.title.split(" ")[1]?.charAt(0) || "G"
                    }`
                  : "G"}
              </span>
            </div>
            <div className="text-sm xl:text-lg font-semibold pl-4 xl:pl-6">
              {note.title || "Untitled Group"}
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
          selectedGroup && selectedGroup.title && selectedGroup._id
            ? "flex"
            : "hidden md:flex"
        } xl:w-[80%] md:w-[70%] w-full h-full right-0 object-cover`}
      >
        {selectedGroup && selectedGroup.title && selectedGroup._id ? (
          <NotesPage
            title={selectedGroup.title}
            notes={selectedChats}
            groupId={selectedGroup._id}
            state={state}
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
