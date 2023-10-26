import { useSelector } from "react-redux";

import styles from "./OrderDetails.module.css";
import doneImg from "./../../images/done.png";

export default function OrderDetails() {
  const orderData = useSelector((store) => store.orderData.orderNumber);
  const orderRequest = useSelector((store) => store.orderData.orderRequest);
  return (
    <div className={styles.details__container}>
      {orderRequest ? (
        <>
          <header className={`${styles.header} mt-30 mb-8`}>
            <p className={`${styles.details__data} text text_type_digits-large`}>XXXXXХ</p>
          </header>
          <p className="text text_type_main-default mb-2">Присвоение идентификатора...</p>
          <p className="text text_type_main-default text_color_inactive mb-30">
            Пожалуйста, подождите
          </p>
        </>
      ) : (
        <>
          <header className={`${styles.header} mt-30 mb-8`}>
              <p className={`${styles.details__data} text text_type_digits-large`}>{orderData}</p>
          </header>
          <div></div>
          <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img className="mt-15 mb-15" src={doneImg} alt="Кул!" />
          <p className="text text_type_main-default mb-2">Ваш заказ готовится!</p>
          <p className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
