import { useEffect, FC } from "react";

import styles from "./orders.module.css";

import OrderCard from "../order-card/order-card";

import {
  wsProfileOrdersConnect,
  wsProfileOrdersDisconnect,
} from "../../services/actions/profile-orders";
import { useDispatch, useSelector } from "../../services/types/hooks";

const Orders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.profileOrders.ordersData);

  useEffect(() => {
    // Получаем токен доступа из localStorage
    const accessToken: string | undefined = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")?.slice(7)
      : "";
    // Формируем URL для WebSocket соединения
    const wsFeedOrdersUserUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
    // Устанавливаем соединение при монтировании компонента
    dispatch(wsProfileOrdersConnect(wsFeedOrdersUserUrl));
    // Разрываем соединение при размонтировании компонента
    return () => {
      dispatch(wsProfileOrdersDisconnect());
    };
  }, [dispatch]);

  return (
    <ul className={`custom-scroll ${styles.list}`}>
      {/* Перебираем массив заказов и создаем для каждого компонент OrderCard */}
      {orders &&
        orders
          .slice()
          .reverse()
          .map((order) => <OrderCard key={order._id} order={order} />)}
    </ul>
  );
};

export default Orders;
