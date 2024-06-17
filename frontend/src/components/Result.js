import React from "react";
import "./../css/Result.css";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import ColorBox from "./ColorBox";
import { Button, Card, Divider, Flex, Tooltip, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
function Result() {
  const { activeState } = useGlobalStateContext();

  const copyToClipboard = () => {
    message.success("Copied to clipboard.");
    navigator.clipboard.writeText(activeState.result);
  };

  const downloadFile = () => {
    const content = JSON.stringify(activeState.result);

    const file = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file, "urine_strip_result.txt");
  };

  return (
    <div className="result">
      <h1 className="result-header">Test Results</h1>
      <div className="result-body">
        {activeState.result && (
          <div className="test-result-container">
            {Object.entries(activeState.result).map(([key, values]) => (
              <div
                key={key}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <ColorBox color={`rgb(${values.join(", ")})`} pad={key} />
                <span>
                  <strong>{key} : </strong> ({values.join(", ")})
                </span>
              </div>
            ))}
          </div>
        )}
        <Divider />
        <Flex justify="center" gap={50}>
          <Button
            className="action-btn"
            type="primary"
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
          >
            Copy
          </Button>
          <Button
            className="action-btn"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={downloadFile}
          >
            Download
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default Result;
