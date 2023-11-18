import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useLocation, Link } from "react-router-dom";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";

import { Ingredient } from "./Ingredient/Ingredient";

function BurgerIngredients() {
  const data = useSelector((store) => store.ingredients.ingredients);
  const location = useLocation();

  const [current, setCurrent] = React.useState("Булки");

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [bunsRef, bunsInView] = useInView({ threshold: 0.3 });
  const [sausesRef, sausesInView] = useInView({ threshold: 0.3 });
  const [mainRef, mainInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (bunsInView) {
      setCurrent("Булки");
    } else if (sausesInView) {
      setCurrent("Соусы");
    } else if (mainInView) {
      setCurrent("Начинки");
    }
  }, [bunsInView, sausesInView, mainInView]);

  function renderIngredientsByType(data, type) {
    return data.map((el) => {
      if (el.type === type)
        return (
          <Link
            to={{
              pathname: `/ingredients/${el._id}`,
            }}
            state={{ background: location }}
            className={styles.ingredient__link}
            key={el._id}
          >
            <ul className={styles.ingredient__list}>
              <Ingredient el={el} />
            </ul>
          </Link>
        );
      return null;
    });
  }

  return (
    <>
      <div>
        <h1 className="text text_type_main-large ml-0 mr-0 mb-5 mt-10">Соберите бургер</h1>
        <div className={`mb-10 ${styles.tab_ontainer}`}>
          <Tab value="Булки" active={current === "Булки"} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === "Начинки"} onClick={setTab}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={`custom-scroll ${styles.scroll}`}>
        <h2 id="Булки" className={`mb-6 ${styles.scroll__ingredients}`}>
          Булки
        </h2>
        <div ref={bunsRef} className={styles.scroll__ingredients}>
          {renderIngredientsByType(data, "bun")}
        </div>

        <h2 id="Соусы" className={`mb-6 ${styles.scroll__ingredients}`}>
          Соусы
        </h2>
        <div ref={sausesRef} className={styles.scroll__ingredients}>
          {renderIngredientsByType(data, "sauce")}
        </div>

        <h2 id="Начинки" className={`mb-6 ${styles.scroll__ingredients}`}>
          Начинки
        </h2>
        <div ref={mainRef} className={styles.scroll__ingredients}>
          {renderIngredientsByType(data, "sauce")}
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
