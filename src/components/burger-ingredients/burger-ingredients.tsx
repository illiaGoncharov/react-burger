import { useRef, useState, useMemo, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import IngredientList from "../ingredient-list/ingredient-list";

import { openModalIngredientDetails } from "../../services/actions/ingredient";

import { TIngredient } from "../../utils/types";

interface IOffset {
  [key: string]: number;
}

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const { ingredients } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  const buns = useMemo(
    () => ingredients.filter((element) => element.type === "bun"),
    [ingredients],
  );

  const mains = useMemo(
    () => ingredients.filter((element) => element.type === "main"),
    [ingredients],
  );

  const sauces = useMemo(
    () => ingredients.filter((element) => element.type === "sauce"),
    [ingredients],
  );

  // Рефы для элементов, используемых при изменении вкладок
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  // Функция для изменения вкладки при прокрутке
  const handleChangeTab = () => {
    const mainTop = mainRef.current?.getBoundingClientRect().top as number;
    const containerTop = containerRef.current?.getBoundingClientRect()
      .top as number;
    const bunTop = bunRef.current?.getBoundingClientRect().top as number;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top as number;

    // Рассчитываем расстояния от верха контейнера до каждой секции
    const offset: IOffset = {
      bun: Math.abs(bunTop - containerTop),
      sauce: Math.abs(sauceTop - containerTop),
      main: Math.abs(mainTop - containerTop),
    };

    // Выбираем вкладку с минимальным расстоянием
    const activeTab = Object.keys(offset).reduce(
      (prev: string, current: string) =>
        offset[prev] < offset[current] ? prev : current,
      "",
    );

    // Обновляем текущую вкладку, если она изменилась
    if (currentTab !== activeTab) {
      setCurrentTab(activeTab);
    }
  };

  // Функция для перехода к активной вкладке по клику на таб
  const clickActiveTab = (target: string) => {
    setCurrentTab(target);
    // Используем scrollIntoView
    switch (target) {
      case "bun":
        bunRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauce":
        sauceRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "main":
        mainRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  // Функция для открытия модального окна с деталями ингредиента
  const openModal = (ingredientSelected: TIngredient) => {
    dispatch(openModalIngredientDetails(ingredientSelected));
  };

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={currentTab === "bun"} onClick={clickActiveTab}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={clickActiveTab}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={clickActiveTab}
        >
          Начинки
        </Tab>
      </div>
      <ul
        className={`custom-scroll ${styles.subs}`}
        onScroll={handleChangeTab}
      >
        <IngredientList
          name={"Булки"}
          ingredients={buns}
          ref={bunRef}
          onClick={openModal}
        />
        <IngredientList
          name={"Соусы"}
          ingredients={sauces}
          ref={sauceRef}
          onClick={openModal}
        />
        <IngredientList
          name={"Начинки"}
          ingredients={mains}
          ref={mainRef}
          onClick={openModal}
        />
      </ul>
    </section>
  );
};

export default BurgerIngredients;
