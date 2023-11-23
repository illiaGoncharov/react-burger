import { FC } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient.module.css";

import { useSelector } from "../../services/types/hooks";
import { TIngredientProps } from "../../utils/types";

const Ingredient: FC<TIngredientProps> = ({ ingredient, onClick }) => {
  const location = useLocation();
  const { image, name, price, _id } = ingredient;

  const { ingredientsBurgerConstructor } = useSelector(
    (store) => store.constructor,
  );

  // Используем хук useDrag для создания перетаскиваемого
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // Подсчитываем количество данного ингредиента в конструкторе бургера
  const count = ingredientsBurgerConstructor?.filter(
    (item) => item._id === ingredient._id,
  ).length;

  return (
    // Используем Link из react-router-dom для навигации к деталям ингредиента
    <Link
      key={_id}
      to={`/ingredients/${_id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li className={styles.el} ref={dragRef} onClick={onClick} >
        {/* Отображаем счетчик, если ингредиент добавлен в конструктор */}
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img src={image} alt={name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{name}</p>
      </li>
    </Link>
  );
};

export default Ingredient;
