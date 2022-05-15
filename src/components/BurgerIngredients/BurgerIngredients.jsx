import React, { useRef, useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsCSS from './BurgerIngredients.module.css';

import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerIngredients(props) {
  
  const [current, setCurrent] = React.useState("bun");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const clickTab = (e, ref) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const [isOpened, setIsOpened] = useState(false);
  function toggleModal(item) {
    setIsOpened(item);
  }

  return (
    <section className={BurgerIngredientsCSS.ingredients}>

    <h1 className={"text text_type_main-large mb-5 mt-10"}>
      Соберите бургер
    </h1>

    <div className={BurgerIngredientsCSS.ingredients__tabs}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={(e) => clickTab(e, bunRef)}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={(e) => clickTab(e, sauceRef)}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === "main"}
        onClick={(e) => clickTab(e, mainRef)}
      >
        Начинки
      </Tab>
    </div>

    <div
      className={`${BurgerIngredientsCSS.ingredients__scroll} custom-scroll mt-10`}
    >
      <section id={"bun"} ref={bunRef}>
        <h2 className={"text text_type_main-medium"}>Булки</h2>
        <ul className={BurgerIngredientsCSS.ingredients__list}>
          {props.ingredients.map(
            (item) =>
              item.type === "bun" && (
                <li
                  key={item._id}
                  onClick={() => {
                    toggleModal(item);
                  }}
                >
                  <BurgerIngredient item={item} handler={toggleModal} />
                </li>
              )
          )}
        </ul>
      </section>
      <section id={"sauce"} ref={sauceRef}>
        <h2 className={"text text_type_main-medium"}>Соусы</h2>
        <ul className={BurgerIngredientsCSS.ingredients__list}>
          {props.ingredients.map(
            (item) =>
              item.type === "sauce" && (
                <li
                  key={item._id}
                  onClick={() => {
                    toggleModal(item);
                  }}
                >
                  <BurgerIngredient item={item} handler={toggleModal} />
                </li>
              )
          )}
        </ul>
      </section>
      <section id={"main"} ref={mainRef}>
        <h2 className={"text text_type_main-medium"}>Начинки</h2>
        <ul className={BurgerIngredientsCSS.ingredients__list}>
          {props.ingredients.map(
            (item) =>
              item.type === "main" && (
                <li
                  key={item._id}
                  onClick={() => {
                    toggleModal(item);
                  }}
                >
                  <BurgerIngredient item={item} handler={toggleModal} />
                </li>
              )
          )}
        </ul>
      </section>
    </div>
    {isOpened && (
      <Modal onClose={toggleModal} title={"Детали ингредиента"}>
        <IngredientDetails item={isOpened} />
      </Modal>
    )}
    </section>
  );
}

export default BurgerIngredients;
