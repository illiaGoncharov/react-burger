import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalPortal = document.getElementById("react-modals");

export default function Modal({ children, handlePopupClose }) {
  useEffect(() => {
    const handleEscapeKeyPress = (evt) => {
      if (evt.key === "Escape") {
        handlePopupClose();
      }
    };

    document.addEventListener("keyup", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keyup", handleEscapeKeyPress);
    };
  }, [handlePopupClose]);

  const closeModal = () => {
    handlePopupClose();
  };

  return createPortal(
    <>
      <div className={styles.modal__container}>
        <button
          onClick={closeModal}
          className={`${styles.modal__button} mt-15 mr-10`}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay handlePopupClose={handlePopupClose} />
    </>,
    modalPortal
  );
}

Modal.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
};
