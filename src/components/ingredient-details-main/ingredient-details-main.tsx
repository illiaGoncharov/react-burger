import { useMemo, FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";

import styles from "./ingredient-details-main.module.css";

const IngredientDetailsMain: FC = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const { id } = useParams();

  // Используем useMemo для мемоизации выбранного ингредиента
  const ingredientSelected = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients, id],
  );

  return ingredientSelected ? (
    <div className={styles.card}>
      <img
        className={styles.img}
        src={ingredientSelected.image}
        alt={ingredientSelected.name}
      />
      <p className="text text_type_main-medium">{ingredientSelected.name}</p>
      <ul className={styles.container}>
        <li className="text text_type_main-default text_color_inactive">
          Калории, ккал
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Белки, г
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Жиры, г
        </li>
        <li className="text text_type_main-default text_color_inactive">
          Углеводы, г
        </li>

        {/* Вместо повторения кода пробую цикл */}
        {["calories", "proteins", "fat", "carbohydrates"].map((property) => (
          <li
            key={property}
            className="text text_type_main-default text_color_inactive"
          >
            {ingredientSelected[property]}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default IngredientDetailsMain;
