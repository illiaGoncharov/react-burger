import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ProfileOrderDetails.module.css";
import {
  wsProfileOrdersConnectionStop,
  wsProfileOrdersConnectionStart,
} from "../../services/actions/wsProfileOrdersActions";

import { extractAltFromURL } from "../../utilities/variousUtils";

const ProfileOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const orders = useSelector((store) => store.wsProfileOrders.orders);

  useEffect(() => {
    const token = (localStorage.getItem("accessToken") || "").replace("Bearer ", "");
    // Запуск WebSocket 
    dispatch(
      wsProfileOrdersConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );
    return () => {
      dispatch(wsProfileOrdersConnectionStop());
    };
  }, [dispatch]);

  // Мемоизированное получение конкретного заказа
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
  
  return orderElement ? (
    <main className={`${styles.profile_order__main}`}>
      <p className={`${styles.profile_order__orderNumber} text text_type_digits-default mb-10`}>
        #{orderElement.number}
      </p>

      <h1 className={`text text_type_main-medium mb-3 ${styles.profile_order__textWrap}`}>{orderElement.name}</h1>
      {orderElement.status === "done" && (
        <p className={`mb-15 text text_type_main-default ${styles.profile_order__textActive}`}>Выполнен</p>
      )}
      {orderElement.status === "created" && (
        <p className="mb-15 text text_type_main-default">Создан</p>
      )}
      {orderElement.status === "pending" && (
        <p className="mb-15 text text_type_main-default">Готовится</p>
      )}
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <ul className={`${styles.profile_order__list} ${styles.profile_order__scroll} custom-scroll`}>
        {ingredients.map((el, index) => {
          if (!displayedIngredients.includes(el._id)) {
            displayedIngredients.push(el._id);
            const ingredientCount = orderElement.ingredients.filter(ingredientId => ingredientId === el._id).length;

            return (
              <li className={`${styles.profile_order__listElement} mr-6`} key={index}>
                <div className={styles.profile_order__imgAndName}>
                  <img alt={extractAltFromURL(el.image)} src={el.image} className={`${styles.profile_order__image} mr-4`} />
                  <p className={`text text_type_main-default ${styles.profile_order__name}`}>{el.name}</p>
                </div>
                <div className={styles.profile_order__price}>
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
      <div className={styles.profile_order__timeAndTotalPrice}>
        <p className="text text_type_main-default text_color_inactive">{orderElement.createdAt}</p>
        <div className={styles.profile_order__totalPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  ) : (
      <h1 className={`text text_type_main-large ${styles.profile_order__loading}`}>ProfileOrderDetails...</h1>
  );
};

export default ProfileOrderDetails;
