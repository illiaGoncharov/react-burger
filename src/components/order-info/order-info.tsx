import { useEffect, FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-info.module.css";

import { useDispatch, useSelector } from "../../services/types/hooks";
import { getOrderInfo } from "../../services/actions/order";

import { getStatus, getTimeZone } from "../../utils/utils";
import { TIngredient } from "../../utils/types";

const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  const { id } = useParams();

  // Получение данных о заказе и ингредиентах из Redux store
  const listIngredients = useSelector((store) => store.ingredients.ingredients);
  const { name, number, ingredients, status, createdAt } = useSelector(
    (store) => store.order.orderData,
  );

  useEffect(() => {
    // Загрузка данных о заказе при монтировании компонента
    dispatch(getOrderInfo(id));
  }, [dispatch, id]);

  // Инициализация массива для уникальных ингредиентов
  const dataIngredients: TIngredient[] = [];
  // Инициализация объекта для подсчета количества каждого ингредиента
  const counter: any = {};

  // Вычисление общей стоимости заказа
  const totalPrice =
    listIngredients &&
    ingredients &&
    ingredients.reduce((total, id) => {
      listIngredients.forEach((i) => {
        if (i._id === id) {
          total += i.price;
        }
      });
      return total;
    }, 0);

  // Подготовка данных о каждом уникальном ингредиенте
  if (listIngredients && ingredients) {
    ingredients.forEach((i) => {
      if (counter[i] === undefined) {
        counter[i] = 1;
        const addedElement = listIngredients.find(
          (element) => element._id === i,
        );
        addedElement && dataIngredients.push(addedElement);
      } else {
        counter[i]++;
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* Номер заказа, скрытый при просмотре в модальном окне */}
      {background ? (
        ""
      ) : (
        <p
          className={`${styles.order} text text_type_digits-default`}
        >{`#${number}`}</p>
      )}
      <h1 className="text text_type_main-medium">{name}</h1>
      {/* Статус заказа */}
      <p
        className={
          status === "done"
            ? `${styles.status} ${styles.status_done} text text_type_main-default`
            : `${styles.status} ${styles.status_pending} text text_type_main-default`
        }
      >
        {getStatus(status)}
      </p>
      {/* Список ингредиентов */}
      <h2 className={`${styles.structure} text text_type_main-medium`}>
        Состав
      </h2>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients &&
          listIngredients &&
          dataIngredients &&
          dataIngredients.map((i) => (
            <li key={i._id} className={styles.element}>
              <div className={styles.img_container}>
                <div className={styles.img_background}>
                  <div className={styles.img_box}>
                    <img className={styles.img} src={i.image} alt={i.name} />
                  </div>
                </div>
                <h3 className={`${styles.name} text text_type_main-default`}>
                  {i.name}
                </h3>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default">
                  {counter[i._id]}
                </p>
                <p className="text text_type_main-default">&nbsp;x&nbsp;</p>
                <div className={styles.caption}>
                  <p className="text text_type_digits-default">{i.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))}
      </ul>
      {/* Контейнер для даты и времени создания заказа, а также общей стоимости */}
      <div className={styles.box}>
        <div className={styles.caption}>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(createdAt)}
          />
          <p className="text text_type_main-default text_color_inactive">
            {getTimeZone(createdAt)}
          </p>
        </div>
        <div className={styles.caption}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default OrderInfo;
