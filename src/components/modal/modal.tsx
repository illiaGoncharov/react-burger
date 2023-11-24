import { useEffect, FC } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

import { TModalProps } from "../../utils/types";

const Modal: FC<TModalProps> = ({ children, closeModal }) => {
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    const handleEsc = (evt: { key: string }) => {
      // Проверка на нажатие клавиши Escape
      evt.key === "Escape" && closeModal();
    };
    // Добавление обработчика события клавиатуры
    document.addEventListener("keydown", handleEsc);
    // Удаление обработчика события при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <section className={styles.main}>
        <div className={styles.container}>{children}</div>
        <ModalOverlay closeModal={closeModal} />
      </section>
    </>,
    modalRoot as HTMLElement,
  );
};

export default Modal;
