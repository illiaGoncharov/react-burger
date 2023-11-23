import { useEffect, useCallback, FC } from "react";

import styles from "./feed-page.module.css";

import OrderCard from "../../components/order-card/order-card";

import {
  wsOrderConnect,
  wsOrderDisconnect,
} from "../../services/actions/order-feed";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { wsFeedUrl } from "../../utils/constants";

const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (state) => state.feedOrders.orders,
  );

  // useCallback, чтобы избежать создания новой функции при каждом рендере
  const connectToWebSocket = useCallback(() => {
    dispatch(wsOrderConnect(wsFeedUrl));
    return () => {
      dispatch(wsOrderDisconnect());
    };
  }, [dispatch]);

  // useEffect с пустым массивом зависимостей для эмуляции componentDidMount
  useEffect(() => {
    const disconnectWebSocket = connectToWebSocket();
    return () => disconnectWebSocket();
  }, [connectToWebSocket]);

  // Фильтрую заказы внутри JSX вместо создания отдельных массивов
  const doneOrders = orders
    ?.filter((order) => order.status === "done")
    .slice(0, 9);
  const pendingOrders = orders
    ?.filter((order) => order.status === "pending")
    .slice(0, 9);

  return (
    <div className={styles.feed}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={styles.main}>
        <ul className={`custom-scroll ${styles.order_feed}`}>
          {orders &&
            orders.map((order) => <OrderCard key={order._id} order={order} />)}
        </ul>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.element}>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <ul className={styles.list}>
                {doneOrders &&
                  doneOrders.map((order, i) => (
                    <li
                      key={i}
                      className={`text text_type_digits-default ${styles.status_done}`}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.element}>
              <h2 className="text text_type_main-medium">В работе:</h2>
              <ul className={styles.list}>
                {pendingOrders &&
                  pendingOrders.map((order, i) => (
                    <li key={i} className="text text_type_digits-default">
                      {order.number}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={styles.caption}>
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2>
            <p className="text text_type_digits-large">{total || 0}</p>
          </div>
          <div className={styles.caption}>
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2>
            <p className="text text_type_digits-large">{totalToday || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
