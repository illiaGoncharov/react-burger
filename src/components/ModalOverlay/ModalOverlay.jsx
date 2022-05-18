import OverlayStyles from "./ModalOverlay.module.css";

import PropTypes from "prop-types";

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

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}
