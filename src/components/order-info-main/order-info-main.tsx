import { FC } from "react";
import { useParams } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-info-main.module.css";
import OrderInfo from "../order-info/order-info";

import { TModalProps } from "../../utils/types";

const OrderInfoMain: FC<TModalProps> = ({ closeModal }) => {
  // Получаем id заказа из параметров URL
  const { id } = useParams();

  return (
    <div className={styles.main}>
      {/* Блок с номером заказа и кнопкой закрытия */}
      <div className={styles.block}>
        <p className="text text_type_digits-default">{`#${id}`}</p>
        <button type={"button"} className={styles.button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
      </div>
      {/* Компонент с деталями заказа */}
      <OrderInfo />
    </div>
  );
};

export default OrderInfoMain;
