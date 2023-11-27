import { FC } from "react";

import styles from "./order-info-page.module.css";

import OrderInfo from "../../components/order-info/order-info";

// Компонент страницы с информацией о заказе
const OrderInfoPage: FC = () => {
  return (
    <main className={styles.main}>
      {/* Компонент с деталями заказа */}
      <OrderInfo />
    </main>
  );
};
export default OrderInfoPage;
