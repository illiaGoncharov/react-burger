import { useMemo, FC } from "react";
import { useParams } from "react-router-dom";

import IngredientDetailsMain from "../../components/ingredient-details-main/ingredient-details-main";

import styles from "./info-ingredient-page.module.css";

import { useSelector } from "../../services/types/hooks";

const InfoIngredientPage: FC = () => {
  // Получаем список ингредиентов из состояния Redux
  const { ingredients } = useSelector((store) => store.ingredients);
  // Получаем id ингредиента из URL с использованием react-router-dom
  const { id } = useParams();

  // Используем useMemo для мемоизации выбранного ингредиента
  const ingredientSelected = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients, id],
  );

  return (
    // Основная секция страницы с деталями ингредиента
    <main className={styles.main}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      {/* Проверяем, выбран ли ингредиент, и отображаем компонент с деталями */}
      {ingredientSelected && <IngredientDetailsMain />}
    </main>
  );
};

export default InfoIngredientPage;
