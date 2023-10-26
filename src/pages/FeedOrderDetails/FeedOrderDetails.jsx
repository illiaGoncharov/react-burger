import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./FeedOrderDetails.module.css";

import {
  wsOrdersFeedConnectionStart,
  wsOrdersFeedConnectionStop,
} from "../../services/actions/wsOrdersFeedData";

const FeedOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const orders = useSelector((store) => store.wsOrdersFeed.orders);

  useEffect(() => {
    dispatch(
      wsOrdersFeedConnectionStart("wss://norma.nomoreparties.space/orders/all")
    );
    return () => {
      dispatch(wsOrdersFeedConnectionStop());
    };
  }, [dispatch]);

  const getOrderStatusText = (status) => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "created":
        return "Создан";
      case "pending":
        return "Готовится";
      default:
        return "";
    }
  };

  const calculateTotalPrice = () => {
    if (!ingredientsData || !orderElement) {
      return 0;
    }
    return ingredientsData.reduce((accumulator, item) => {
      const ingredient = orderElement.ingredients.find((el) => el === item._id);
      if (ingredient) {
        return item.price + accumulator;
      }
      return accumulator;
    }, 0);
  };

  const orderElement = useMemo(() => {
    return orders?.find((el) => {
      return el._id === id;
    });
  }, [id, orders]);

  return orderElement ? (
    <main className={`${styles.feed_order__main}`}>
      <p className={`${styles.feed_order__number} text text_type_digits-default mb-10`}>
        #{orderElement.number}
      </p>

      <h1 className={`text text_type_main-medium mb-3 ${styles.feed_order__text_wrap}`}>{orderElement.name}</h1>
      {orderElement.status && (
        <p className={`mb-15 text text_type_main-default ${styles.feed_order__text_active}`}>
          {getOrderStatusText(orderElement.status)}
        </p>
      )}
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <ul className={`${styles.feed_order__list} ${styles.feed_order__scroll} custom-scroll`}>
        {ingredientsData &&
          orderElement.ingredients.map((ingredient, index) => {
            const el = ingredientsData.find((item) => item._id === ingredient);
            if (el) {
              return (
                <li className={`${styles.feed_order__list_element} mr-6`} key={index}>
                  <div className={styles.feed_order__pic_name}>
                    <img alt=":)" src={el.image} className={`${styles.feed_order__pic} mr-4`} />
                    <p className={`text text_type_main-default`}>{el.name}</p>
                  </div>
                  <div className={styles.feed_order__price}>
                    <p className="text text_type_digits-default mr-2">{el.price}</p>
                    <CurrencyIcon />
                  </div>
                </li>
              );
            }
            return null;
          })}
      </ul>
      <div className={styles.timeAndTotalPrice}>
        <p className="text text_type_main-default text_color_inactive">{orderElement.createdAt}</p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">{calculateTotalPrice()}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  ) : (
    <h1 className={`text text_type_main-large ${styles.loading}`}>Загрузка...</h1>
  );
};

export default FeedOrderDetails;