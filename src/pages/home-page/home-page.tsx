import { FC } from "react";

import styles from "./home-page.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";

const HomePage: FC = () => {
  // Обертка для всей страницы
  return (
    <div className={styles.home}>
      {/* Поставщик для Drag and Drop с использованием HTML5Backend */}
      <DndProvider backend={HTML5Backend}>
        {/* Секция с ингредиентами бургера */}
        <BurgerIngredients />
        {/* Секция с конструктором бургера */}
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default HomePage;
