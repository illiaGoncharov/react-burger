import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import BurgerIngredientsCSS from './BurgerIngredients.module.css';

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [bunRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainRef, inViewMains] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauces] = useInView({ threshold: 0 });

  const { ingredients } = useSelector(store => store.ingredients);
  
  const setCurrent = useCallback(() => {
    if (inViewBuns) {
      return 'buns';
    } else if (inViewSauces) {
      return 'sauces';
    } else if (inViewMains) {
      return 'mains';
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  const current = useMemo(() => setCurrent(), [setCurrent]);

  return (
    <section className={BurgerIngredientsCSS.ingredients}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>Соберите бургер</h1>
      <div className={BurgerIngredientsCSS.ingredients__tabs}>
        <Tab value="buns" active={current === 'buns'}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'}>
          Начинки
        </Tab>
      </div>

      <div className={`${BurgerIngredientsCSS.ingredients__scroll} custom-scroll mt-10`}>
        <div id="buns" ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ol className={`${BurgerIngredientsCSS.ingredients__list} pl-4 pr-4 pb-10 pt-6`}>
            {ingredients && ingredients.filter(item => item.type == "bun").map(item =>
              <BurgerIngredient ingredient={item} key={item._id} />
            )}
          </ol>
        </div>

        <div id="sauces" ref={sauceRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ol className={`${BurgerIngredientsCSS.ingredients__list} pl-4 pr-4 pb-10 pt-6`}>
            {ingredients && ingredients.filter(item => item.type == "sauce").map(item =>
              <BurgerIngredient ingredient={item} key={item._id} />
            )}
          </ol>
        </div>
        <div id="mains" ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ol className={`${BurgerIngredientsCSS.ingredients__list} pl-4 pr-4 pb-10 pt-6`}>
            {ingredients && ingredients.filter(item => item.type == "main").map(item =>
              <BurgerIngredient ingredient={item} key={item._id} />
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
