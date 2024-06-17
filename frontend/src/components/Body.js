import React from "react";
import ImageUpload from "./ImageUpload";
import "./../css/Body.css";
import Result from "./Result";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import { States } from "../utils";
import { Divider, Typography } from "antd";
import StripView from "./StripView";
function Body() {
  const { activeState } = useGlobalStateContext();

  return (
    <div className="body">
      {activeState.state === States.WAITING_FOR_UPLOAD ? (
        <ImageUpload />
      ) : (
        activeState.state !== States.WAITING_FOR_UPLOAD &&
        activeState.file && <StripView />
      )}
      <Divider className="body-divider" />
      {(activeState.state === States.RESULT_READY ||
        activeState.state === States.PROCESSING_IMAGE) && <Result />}
    </div>
  );
}

export default Body;
