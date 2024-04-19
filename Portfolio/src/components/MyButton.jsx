import React from "react";
import "./MyButton.css";
export const MyButton = ({ text, width, height }) => {
  // Splitting the text into three parts
  const [firstPart, secondPart, thirdPart] = text.split("$");

  return (
    <button className="glowing-btn" style={{ width: width, height: height }}>
      <span className="glowing-txt">
        {firstPart.charAt(0)}
        <span className="faulty-letter">{firstPart.slice(1)}</span>
        {secondPart.charAt(0)}
        <span className="faulty-letter">{secondPart.slice(1)}</span>
        {thirdPart.charAt(0)}
        <span className="faulty-letter">{thirdPart.slice(1)}</span>
      </span>
    </button>
  );
};
