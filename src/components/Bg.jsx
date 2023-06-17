import React from "react";
import { useLocation } from "react-router-dom";
import bgImage1 from "../assets/bg.mp4";
import bgImage2 from "../assets/bg2.mp4";
import bgImage3 from "../assets/ducky.mp4"

function Bg() {
  const location = useLocation();
  let videoPath;

  switch (location.pathname) {
    case "/":
      videoPath = bgImage3;
      break;
    case "/signup":
      videoPath = bgImage1;
      break;
    default:
      videoPath = bgImage2;
  }

  return (
    <>
      <video autoPlay loop muted className="bgVideo">
        <source src={videoPath} type="video/mp4"></source>
      </video>
    </>
  );
}

export default Bg;
