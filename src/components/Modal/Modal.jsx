import React from 'react';

import PropTypes from "prop-types";

import ModalCSS from './Modal.module.css';

function Modal() {
  return (
    <>  
    </>
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

