import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./FeedOrderDetails.module.css";

import {
  wsOrdersFeedConnectionStart,
  wsOrdersFeedConnectionStop,
} from "../../services/actions/wsOrdersFeedActions";

import { WS_BASE_URL } from "../../utilities/constants";
import { extractAltFromURL } from "../../utilities/variousUtils";

const FeedOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const orders = useSelector((store) => store.wsOrdersFeed.orders);
  
  useEffect(() => {
    dispatch(
      wsOrdersFeedConnectionStart(`${WS_BASE_URL}/all`)
    );
    return () => {
      dispatch(wsOrdersFeedConnectionStop());
    };
  }, [dispatch]);

  const orderElement = useMemo(() =>
    orders?.find((element) => element._id === id
    ), [id, orders]);

  // Мемоизированное получение ингредиентов 
  const ingredients = useMemo(() =>
    orderElement?.ingredients.map(ingredient => ingredientsData.find(el => el._id === ingredient)
    ), [orderElement, ingredientsData]);

  // Мемоизированное вычисление общей стоимости 
  const totalPrice = useMemo(() =>
    ingredients?.reduce((accumulator, item) => item.price + accumulator, 0
    ), [ingredients]);

  // Прячем повторения 
  const displayedIngredients = [];


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

  // const formattedDate = new Date(orderElement.createdAt).toLocaleString();

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
        {ingredients.map((el, index) => {
          if (!displayedIngredients.includes(el._id)) {
            displayedIngredients.push(el._id);
            const ingredientCount = orderElement.ingredients.filter(ingredientId => ingredientId === el._id).length;

            return (
              <li className={`${styles.feed_order__listElement} mr-6`} key={index}>
                <div className={styles.feed_order__imgAndName}>
                  <img alt={extractAltFromURL(el.image)} src={el.image} className={`${styles.feed_order__image} mr-4`} />
                  <p className={`text text_type_main-default ${styles.feed_order__name}`}>{el.name}</p>
                </div>
                <div className={styles.feed_order__price}>
                  <span className="text text_type_digits-default mr-2">{ingredientCount} x</span>
                  <p className="text text_type_digits-default mr-2">{el.price}</p>
                  <CurrencyIcon />
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className={styles.feed_order__timeAndTotalPrice}>
        <p className="text text_type_main-default text_color_inactive">{orderElement.createdAt}</p>
        <div className={styles.feed_order__totalPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  ) : (
    <h1 className={`text text_type_main-large ${styles.loading}`}>FeedOrderDetails...</h1>
  );
};

export default FeedOrderDetails;