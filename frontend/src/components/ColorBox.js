import { Tooltip, message } from "antd";
import React from "react";
import "./../css/ColorBox.css";

function ColorBox({ color, pad }) {
  const copyToClipboard = () => {
    message.success("Copied to clipboard!");
    navigator.clipboard.writeText(color);
  };

  return (
    <Tooltip title={pad}>
      <div
        className="color-box"
        style={{
          backgroundColor: color,
        }}
        onClick={copyToClipboard}
      ></div>
    </Tooltip>
  );
}

export default ColorBox;
