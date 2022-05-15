import React from "react";
import OverlayStyles from "./ModalOverlay.module.css";

function ModalOverlay(props) {
  return (
    <div
      className={OverlayStyles.overlay}
      onClick={() => {
        props.onClose(false);
      }}
    ></div>
  );
}

export default ModalOverlay;
