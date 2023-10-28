import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructor.module.css";

import { getApiOrder } from "../../services/actions/orderDetailsActions";
import {
  deleteIngredient,
  postIngredient,
} from "../../services/actions/constructorIngredientsActions";

import { ConstructorElements } from "./ConstructorElements/ConstructorElements";

function BurgerConstructor({ handlePopupState }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((store) => store.userData.isAuthenticated);
  const ingredients = useSelector((store) => store.dataConstructor.ingredients);
  
  const buns = useSelector((store) => store.dataConstructor.bun);
  const burgerData = [buns[0], ...ingredients, buns[1]]

  const totalPrice = useMemo(() => {
    const dataConstructor = [...ingredients, ...buns];
    return dataConstructor.reduce((accumulator, item) => accumulator + item.price, 0);
  }, [buns, ingredients]);
  
  function apiOrderData(handlePopupState, ingredients) {
    handlePopupState(true);
    dispatch(getApiOrder(ingredients));
  }

  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    setButtonState(!(ingredients.length > 0 && buns.length > 0));
  }, [ingredients, buns]);

  const handleIngredientDrop = (item) => {
    const uniqueIngredient = { ...item, uniqueId: uuidv4() };
    dispatch(postIngredient(uniqueIngredient));
  };

  const [, ref] = useDrop({
    accept: "ingredient",
    drop: handleIngredientDrop,
  });

  const onClick = () => {
    isAuthenticated
      ? apiOrderData(handlePopupState, burgerData)
      : navigate("/login");
  };

  return (
    <>
      <div className={`mt-25 mb-10 ml-10 ${styles.constructor_container}`} ref={ref}>
        <div className={styles.constructor}>
          {buns.length > 0 ? (
            <ConstructorElement
              type="top"
              text={`${buns[0].name} (верх)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
              isLocked={true}
            />
          ) : (
            <p>Выберите булочку</p>
          )}
        </div>

        <ul className={`custom-scroll ${styles.constructor__list}`}>
          {ingredients.length > 0 ? (
            ingredients.map((el, index) => {
              return (
                <ConstructorElements
                  el={el}
                  index={index}
                  func={deleteIngredient}
                  key={el.uniqueId}
                />
              );
            })
          ) : (
            <p>Добавьте ингредиенты</p>
          )}
        </ul>

        {buns.length > 0 ? (
          <div className={styles.constructor}>
            <ConstructorElement
              type="bottom"
              text={`${buns[0].name} (низ)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
              isLocked={true}
            />
          </div>
        ) : (
          <p>Выбериье булочку</p>
        )}
      </div>
      <div className={styles.final_price}>
        <p className="text text_type_digits-medium mr-10">
          {totalPrice}
          <CurrencyIcon />
        </p>
        <Button
          onClick={() => onClick()}
          htmlType="button"
          type="primary"
          size="large"
          disabled={buttonState}
        >
          Готово! 
        </Button>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  handlePopupState: PropTypes.func.isRequired,
};

export default BurgerConstructor;
