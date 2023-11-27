import { FC } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-details.module.css";
import image from "../../images/done.svg";

import { useSelector } from "../../services/types/hooks";
import { TModalProps } from "../../utils/types";

const OrderDetails: FC<TModalProps> = ({ closeModal }) => {
  const { orderNumber } = useSelector((store) => store.order);
  return (
    <div className={styles.main}>
      {/* Кнопка закрытия модального окна */}
      <div className={styles.block}>
        <button type={"button"} className={styles.button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
      </div>
      {/* Номер заказа */}
      <h2 className="text text_type_digits-large">{orderNumber}</h2>
      <p className={`text text_type_main-medium ${styles.caption}`}>
        Идентификатор заказа
      </p>
      <img alt={"галочка"} className={styles.image} src={image} />
      {/* Сообщение о начале приготовления заказа */}
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.text}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
