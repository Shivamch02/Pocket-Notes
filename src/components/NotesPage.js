import React, { useState } from "react";
import Header from "./Header";
import Notes from "./Notes";
import SendBtnImg from "../images/60525.png";
import SendBtnImg2 from "../images/send-btn.png";

const NotesPage = ({ imgUrl, groupName, notes }) => {
  const [text, setText] = useState("");
  return (
    <div className="w-full overflow-y-scroll">
      <div className="w-full h-16 float-end bg-blue-600 px-3 flex items-center mb-4">
        <Header imgUrl={imgUrl} groupName={groupName} />
      </div>
      <div className="w-[96%] mt-16">
        {notes?.map((note) => (
          <Notes notes={note?.content} />
        ))}
      </div>
      <div className=" w-[80%] bg-blue-800 px-5 py-3 bottom-0 fixed">
        <div className="textarea  relative">
          <textarea
            className="p-4 rounded-lg w-full shadow-sm"
            name="notes"
            value={text}
            id="notes"
            rows={6}
            cols={150}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Your Text Here....."
          ></textarea>
          <button className="absolute bottom-3 right-3">
            {text === "" ? (
              <img className="h-8 w-8" src={SendBtnImg2} alt="send" />
            ) : (
              <img className="h-7 w-6" src={SendBtnImg} alt="send" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
