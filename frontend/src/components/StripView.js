import React from "react";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import "./../css/StripView.css";
import { Button, Card, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { urine_test } from "../api";
import { States } from "../utils";

function StripView() {
  const { activeState, handleGlobalStateChange } = useGlobalStateContext();

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    progress: true,
    customRequest: ({ file }) => {
      handleGlobalStateChange((prev) => ({
        ...prev,
        file: file,
        state: States.PROCESSING_IMAGE,
      }));
      urine_test(
        file,
        (res) => {
          const result = res.data;
          handleGlobalStateChange((prev) => ({
            ...prev,
            state: States.RESULT_READY,
            result: result,
          }));
        },
        (error) => {
          message.error(error.error_message);
          handleGlobalStateChange((prev) => ({
            ...prev,
            state: States.WAITING_FOR_UPLOAD,
          }));
        }
      );
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
      } else if (status === "error") {
        handleGlobalStateChange((prev) => ({
          ...prev,
          state: States.WAITING_FOR_UPLOAD,
        }));
      }
    },
  };
  return (
    <div className="strip-view">
      <PhotoProvider>
        <PhotoView
          src={URL.createObjectURL(activeState.file)}
          style={{
            display: "flex",
            textAlign: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            src={URL.createObjectURL(activeState.file)}
            alt="Selected"
            className="strip-img"
          />
        </PhotoView>
      </PhotoProvider>

      <span className="preview-text">Click To Preview.</span>
      <Upload {...props}>
        <Button
          className="change-strip-btn"
          type="primary"
          icon={<UploadOutlined />}
        >
          Re-Upload
        </Button>
      </Upload>
    </div>
  );
}

export default StripView;
