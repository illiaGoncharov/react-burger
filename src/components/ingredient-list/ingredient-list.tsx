import { forwardRef, RefObject } from "react";
import styles from "./ingredient-list.module.css";
import Ingredient from "../ingredient/ingredient";

import { TIngredientListProps } from "../../utils/types";
interface IIngredientListProps extends TIngredientListProps {
  // Объявляем ref как RefObject для HTMLLIElement
  ref: RefObject<HTMLLIElement>;
}

const IngredientList = forwardRef<HTMLDivElement, IIngredientListProps>(
  ({ ingredients, name, onClick }, ref) => {
    return (
      <li className={styles.subsection} ref={ref as RefObject<HTMLLIElement>}>
        <p className="text text_type_main-medium">{name}</p>
        {/* Список ингредиентов */}
        <ul className={styles.elements}>
          {ingredients.map((el) => {
            return (
              // Передача ингредиента и обработчика клика в компонент Ingredient
              <Ingredient
                key={el._id}
                ingredient={el}
                onClick={() => onClick(el)}
              />
            );
          })}
        </ul>
      </li>
    );
  },
);

export default IngredientList;
