import { FC } from "react";

import styles from "./modal-overlay.module.css";

import { TModalProps } from "../../utils/types";

// Компонент оверлея для модального окна
const ModalOverlay: FC<TModalProps> = ({ closeModal }) => {
  return (
    // Добавление обработчика клика для закрытия модального окна
    <div onClick={closeModal} className={styles.main}></div>
  );
};

export default ModalOverlay;
