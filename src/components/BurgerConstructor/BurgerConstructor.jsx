import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';

import update from 'immutability-helper';
import { useDrop } from 'react-dnd';

import ConstructorCSS from "./BurgerConstructor.module.css";

import {
  ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableItem from './DraggableItem/DraggableItem';
import EmptyContainer from './EmptyContainer/EmptyContainer';
import OrderContainer from './OrderContainer/OrderContainer';

import { addIngredient, addBun, updateIngredients, deleteIngredient } from '../../services/actions/constructorActions';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, stuffings } = useSelector(store => store.constructor);

  const handleDrop = useCallback((item) => {
    if (item.type === "bun") {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  }, [dispatch]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    }
  });

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    const updatedElements = update(stuffings, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, stuffings[dragIndex]],
      ],
    })
    dispatch(updateIngredients(updatedElements));
  }, [stuffings, dispatch])

  const deleteElement = (id) => {
    dispatch(deleteIngredient(id));
  }

  return (
    <div className={`${ConstructorCSS.constructor} mb-10 mt-25`}>
      <div className={ConstructorCSS.constructor__list} ref={dropTarget}>
        <div className={`${ConstructorCSS.constructor__top}`}>
          {bun ?
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
            :
            <EmptyContainer type="top" text="Добавьте булку" />
          }
        </div>
        <div className={` ${ConstructorCSS.constructor__list} custom-scroll`}>
          {stuffings !== undefined && stuffings.length !== 0 ?
            <>
              {stuffings.map((item, index) =>
                <DraggableItem key={item.id} elem={item} index={index} moveElement={moveElement} deleteElement={deleteElement} />
              )}
            </>
            :
            <div>
              <EmptyContainer className={`${ConstructorCSS.constructor__item}`} text="Добавьте ингредиент" />
            </div>
          }
        </div>
        <div className={`${ConstructorCSS.constructor__bottom}`}>
          {bun ?
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
            :
            <EmptyContainer type="bottom" text="Добавьте булку" />
          }
        </div>
      </div>
      <OrderContainer />
    </div>
  );
}

export default BurgerConstructor;
