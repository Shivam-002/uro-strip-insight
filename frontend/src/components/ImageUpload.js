import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import { States } from "../utils";
import { urine_test } from "../api";
import "../css/ImageUpload.css";

const { Dragger } = Upload;

const ImageUpload = () => {
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
        message.error("Upload failed.");
        handleGlobalStateChange((prev) => ({
          ...prev,
          state: States.WAITING_FOR_UPLOAD,
        }));
      }
    },
  };
  return (
    <Dragger
      {...props}
      style={{
        width: "100%",
        height: "100%",
      }}
      className="custom-dragger"
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="upload-text">Click or drag image to this area to upload.</p>
      <p className="upload-hint">
        Strictly prohibited from uploading company data or other banned files.
      </p>
    </Dragger>
  );
};
export default ImageUpload;
