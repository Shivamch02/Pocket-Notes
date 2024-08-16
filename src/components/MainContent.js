import React from "react";
import HomeImg from "../images/home.jpg";
import Modal from "./Modal";

const MainContent = () => {
  return (
    <div className="w-4/5 flex justify-end">
      <img src={HomeImg} alt="HomeImg" />
    </div>
  );
};

export default MainContent;
