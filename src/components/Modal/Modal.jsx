import { useEffect } from "react";

import ModalCSS from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
  const modals = document.querySelector("react-modals");

  useEffect(() => {
    const closeByEsc = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    window.addEventListener("keydown", closeByEsc);
    return () => {
      window.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  return (
    <>  
      <ModalOverlay onClose={props.onClose} />
      <div className={`${ModalCSS.popup} pt-10 pl-10 pr-10 pb-15`}>
        <div>
          <div
            className={`${ModalCSS.popup__header} text text_type_main-large mb-4`}
          >
            <span>{props.title}</span>
            <span
              className={ModalCSS.popup__close}
              onClick={() => {
                props.onClose(false);
              }}
            >
              <CloseIcon type="primary" />
            </span>
          </div>
          <div className={ModalCSS.popup__content}>{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;

