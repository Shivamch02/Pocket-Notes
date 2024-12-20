import React, { useEffect, useState } from "react";
import Header from "./Header";
import Notes from "./Notes";
import SendBtnImg from "../images/60525.png";
import SendBtnImg2 from "../images/send-btn.png";
import axios from "axios";

const NotesPage = ({ imgUrl, title, notes, groupId, state }) => {
  const [text, setText] = useState("");
  const [currentNotes, setCurrentNotes] = useState(notes || []);
  const [isResponse, setIsResponse] = useState(false);

  // Function to handle adding a new note
  const handleAddNote = async (text) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/chats/${groupId}`,
        { content: text }
      );
      setIsResponse(!isResponse);
      setText(""); // Clear the input field
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleGetNote = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chats/${groupId}`
      );
      console.log(response.data.chats);
      setCurrentNotes(response.data.chats);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    handleGetNote();
  }, [isResponse, state]);

  return (
    <div className="w-full md:h-[calc(100vh-205px)] h-[calc(100vh-100px)] overflow-y-scroll bg-cyan-100">
      {/* Header Section */}
      <div className="w-full h-16 float-end bg-blue-600 px-3 flex items-center mb-4">
        <Header imgUrl={imgUrl} title={title} />
      </div>

      {/* Notes Section */}
      <div className="w-full mt-16 bg-cyan-100 px-4">
        {currentNotes.length > 0 ? (
          currentNotes.map((note, index) => (
            <Notes
              key={index}
              notes={note?.content}
              timeStamp={note?.timeStamp}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No notes available yet.</p>
        )}
      </div>

      {/* Input Section */}
      <div className="md:w-[85%] w-full bg-blue-800 h-24 md:h-48 px-5 py-3 bottom-0 fixed">
        <div className="textarea relative">
          <textarea
            className="p-4 rounded-lg xl:w-[94%] w-full sm:w-[80%] md:h-40 shadow-sm"
            name="notes"
            value={text}
            id="notes"
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Your Text Here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                text.trim() && handleAddNote(text.trim());
              }
            }}
          ></textarea>
          <button
            className="absolute xl:bottom-3 bottom-2 right-2 sm:right-32 md:right-44 lg:right-48 xl:right-28"
            onClick={() => text.trim() && handleAddNote(text.trim())}
          >
            {text.trim() ? (
              <img className="h-7 w-6" src={SendBtnImg} alt="Send" />
            ) : (
              <img className="h-8 w-8" src={SendBtnImg2} alt="Send Disabled" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
