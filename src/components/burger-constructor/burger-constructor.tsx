import { useMemo, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import { useDispatch, useSelector } from "../../services/types/hooks";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import Modal from "../modal/modal";
import Loader from "../loader/loader";

import {
  closeModalOrderDetails,
  getOrderNumber,
} from "../../services/actions/order";
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
} from "../../services/actions/constructor";

import uuid from "react-uuid";

import { TIngredient } from "../../utils/types";

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Используем хуки Redux для получения состояния из хранилища
  const { ingredientsBurgerConstructor } = useSelector(
    (store) => store.constructor,
  );
  const { orderNumber, orderError, orderRequest } = useSelector(
    (store) => store.order,
  );

  // Используем useMemo для мемоизации данных и оптимизации производительности
  const bun = useMemo(
    () =>
      ingredientsBurgerConstructor?.find(
        (ingredient) => ingredient.type === "bun",
      ),
    [ingredientsBurgerConstructor],
  );

  const ingredients = useMemo(
    () =>
      ingredientsBurgerConstructor?.filter(
        (ingredient) => ingredient.type !== "bun",
      ),
    [ingredientsBurgerConstructor],
  );

  // Получение информации о пользователе из хранилища
  const { user } = useSelector((state) => state.auth);

  // Функция для получения деталей заказа или перенаправления на страницу входа
  const getOrderDetails = () => {
    if (user) {
      const ingredientsList = [
        bun?._id,
        ...ingredients.map((i) => i._id),
        bun?._id,
      ] as string[];
      const data = {
        ingredients: ingredientsList,
      };
      dispatch(getOrderNumber(data.ingredients));
    } else {
      navigate("/login");
    }
  };

  // Обработчик перетаскивания ингредиентов
  const handleDrop = (ingredient: TIngredient) => {
    if (ingredient.type === "bun" && bun && bun.uuid !== undefined) {
      dispatch(removeIngredient(bun.uuid));
    }
    dispatch(addIngredient(ingredient, uuid()));
  };

  // Хук drop для обработки перетаскивания ингредиентов
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (ingredient: TIngredient) => {
      handleDrop(ingredient);
    },
    collect: (monitor) => ({
      isDrop: monitor.isOver(),
    }),
  });

  // Вычисление общей стоимости бургера
  const totalPrice = useMemo(
    () =>
      ingredientsBurgerConstructor
        ? ingredientsBurgerConstructor.reduce(
            (sum, current) => sum + current.price,
            0,
          )
        : 0,
    [ingredientsBurgerConstructor],
  );

  // Функции для удаления и перемещения ингредиентов
  const removeBurgerIngredient = (uuid: string) => {
    dispatch(removeIngredient(uuid));
  };

  const moveBurgerIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  };

  // Активна ли кнопка?
  const disabledButton = !ingredientsBurgerConstructor?.length || !bun;

  // Закрытие модального окна с деталями заказа
  const closeModalOrder = () => {
    dispatch(closeModalOrderDetails());
  };

  return (
    <>
      <section className={styles.main}>
        <div className={styles.container} ref={dropTarget}>
          {bun ? (
            <div className={styles.locked}>
              <ConstructorElement
                text={`${bun.name} (верх)`}
                type="top"
                isLocked={true}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            (!orderError ||
              (!bun && ingredientsBurgerConstructor.length > 0)) && (
              <div>
                <p className="text text_type_main-medium">
                  Выберите булочку и другие ингредиенты
                </p>
              </div>
            )
          )}
          <div className={`custom-scroll ${styles.box}`}>
            {ingredients &&
              ingredients.map((element, index) => (
                <BurgerConstructorElement
                  ingredient={element}
                  index={index}
                  key={element.uuid}
                  onMove={moveBurgerIngredient}
                  onDelete={removeBurgerIngredient}
                />
              ))}
          </div>
          {bun ? (
            <div className={styles.locked}>
              <ConstructorElement
                text={`${bun.name} (низ)`}
                type="bottom"
                isLocked={true}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ) : (
            !orderError || (!bun && ingredientsBurgerConstructor.length > 0)
          )}
        </div>
        <div className={styles.el}>
          <div className={styles.capt}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={getOrderDetails}
            disabled={disabledButton}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderNumber && (
        <Modal closeModal={closeModalOrder}>
          <OrderDetails closeModal={closeModalOrder} />
        </Modal>
      )}
      {!orderNumber && orderRequest && (
        <Modal closeModal={closeModalOrder}>
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
