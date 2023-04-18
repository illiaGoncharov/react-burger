import { useState, useContext, useReducer, useEffect, useMemo } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ConstructorCSS from "./BurgerConstructor.module.css";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import IngredientsContext from "../../context/IngredientsContext";
import OrderContext from "../../context/OrderContext"

import { constructorReducer, REMOVE_INGREDIENT, SET_TOTAL_SUM } from '../../reducers/constructorReducer';

function BurgerConstructor() {
  const ingredients = useContext(IngredientsContext);
  const { orderNumber, setOrderNumber } = useContext(OrderContext);

  const [state, dispatch] = useReducer(constructorReducer, { ingredients: [], totalSum: 0 });
  const handleRemoveIngredient = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, payload: ingredient });
  }
  useEffect(() => {
    dispatch({ type: SET_TOTAL_SUM, payload: { ingredients } });
  }, [dispatch, ingredients]);

  const [isOpened, setIsOpened] = useState(false);
  function toggleModal() {
    setIsOpened(!isOpened);
  }

  const bun = useMemo(() => ingredients.find((item) => item.type === "bun"), [ingredients]);
  const otherIngredients = useMemo(() => ingredients.filter((item) => item.type !== "bun"), [ingredients]);

  const handleOrderSubmit = () => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    const body = JSON.stringify({
      ingredients: ingredientIds
    });
    console.log(body);
    
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setOrderNumber(data.order.number);
        toggleModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return ingredients.length && (
    <section className={`${ConstructorCSS.constructor} mt-25`}>

      {isOpened && (
        <Modal onClose={toggleModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}

      <div className={ConstructorCSS.constructor__top}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun?.name} (верх)`}
          price={bun?.price}
          thumbnail={bun?.image}
        />
      </div>

      <ul
        className={`${ConstructorCSS.constructor__list} custom-scroll mt-4 mb-4`}
      >
        {otherIngredients.map((item, index) => (
          <li className={ConstructorCSS.constructor__item} key={item._id + index} onClick={() => handleRemoveIngredient(item)}>
            <DragIcon type="primary" />
            <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
          </li>
        ))}
      </ul>

      <div className={ConstructorCSS.constructor__bottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun?.name} (низ)`}
          price={bun?.price}
          thumbnail={bun?.image}
        />
      </div>
      
      <section className={`${ConstructorCSS.constructor__total} mt-10`}>
        <div className={ConstructorCSS.constructor__wrap}>
          <span className="text text_type_digits-medium">{state.totalSum}</span>
          <span>
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9265 1.15561C15.1234 0.688944 14.5814 0.258987 14.1718 0.556891L0.911841 10.2005C0.653097 10.3887 0.500013 10.6893 0.500013 11.0092V18.3995C0.500013 18.6099 0.631712 18.7978 0.829485 18.8695L5.68112 20.6298C6.1816 20.8113 6.73659 20.5689 6.94354 20.0784L14.9265 1.15561Z"
                fill="#F2F2F3"
              />
              <path
                d="M1.18083 21.7641C0.853125 21.637 0.500009 21.8787 0.500006 22.2302L0.500003 22.6005C0.500001 22.7715 0.587339 22.9306 0.731565 23.0224L14.7724 31.9574C14.8743 32.0223 14.9824 31.8844 14.8952 31.8008L6.76629 24.0129C6.67116 23.9217 6.55896 23.8503 6.43614 23.8027L1.18083 21.7641Z"
                fill="#F2F2F3"
              />
              <path
                d="M19.1048 31.8008C19.0176 31.8844 19.1257 32.0223 19.2277 31.9574L33.2684 23.0224C33.4127 22.9306 33.5 22.7715 33.5 22.6005V22.2303C33.5 21.8788 33.1469 21.637 32.8192 21.7641L27.5639 23.8027C27.4411 23.8503 27.3289 23.9217 27.2337 24.0129L19.1048 31.8008Z"
                fill="#F2F2F3"
              />
              <path
                d="M33.1705 18.8695C33.3683 18.7978 33.5 18.6099 33.5 18.3995V11.0092C33.5 10.6893 33.3469 10.3887 33.0882 10.2005L19.8282 0.556892C19.4186 0.258988 18.8766 0.688947 19.0735 1.15561L27.0565 20.0784C27.2634 20.5689 27.8184 20.8113 28.3189 20.6298L33.1705 18.8695Z"
                fill="#F2F2F3"
              />
              <path
                d="M17.7142 29.8067C17.3221 30.2068 16.6779 30.2068 16.2858 29.8067L9.43301 22.814C9.15734 22.5327 9.07246 22.1158 9.2162 21.7491L16.069 4.26753C16.4009 3.42082 17.5991 3.42082 17.931 4.26753L24.7838 21.7491C24.9276 22.1158 24.8427 22.5327 24.567 22.814L17.7142 29.8067Z"
                fill="#F2F2F3"
              />
            </svg>
          </span>
        </div>
        <Button type="primary" size="medium" onClick={handleOrderSubmit}>
          <span className="text text_type_main-default">Оформить заказ</span>
        </Button>
      </section>

    </section>
  );
}

export default BurgerConstructor;
