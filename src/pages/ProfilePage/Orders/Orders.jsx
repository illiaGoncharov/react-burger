import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./Orders.module.css";
import ListElement from "./ListElement/ListElement";

import {
  wsProfileOrdersConnectionStart,
  wsProfileOrdersConnectionStop,
} from "../../../services/actions/wsProfileOrdersActions";

import { WS_BASE_URL } from "./../../../utils/constants";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsProfileOrders.orders);
  const location = useLocation();

  useEffect(() => {
    const token = (localStorage.getItem("accessToken") || "").replace("Bearer ", "");
    dispatch(
      wsProfileOrdersConnectionStart(`${WS_BASE_URL}/orders?token=${token}`)
      );

    return () => {
      dispatch(wsProfileOrdersConnectionStop());
    };
  }, [dispatch]);

  return orders.length > 0 ? (
    <section>
      <ul className={`${styles.order__list} ${styles.order__scroll} custom-scroll mr-15`}>
        {orders.map((el, index) => {
          return (
            <li key={index} className={styles.order__li}>
              <Link
                to={{ pathname: `/profile/orders/${el._id}` }}
                state={{ background: location }}
                className={styles.order__link}
              >
                <ListElement props={el} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  ) : (
    <h1 className="text text_type_main-large">Загрузка...</h1>
  );
};
