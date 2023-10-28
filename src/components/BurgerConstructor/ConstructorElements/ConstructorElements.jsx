import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ConstructorElements.module.css";

import { moveIngredient } from "../../../services/actions/constructorIngredientsActions";

export function ConstructorElements({ el, index, func }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  // Настройка перетаскивания элементов
  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { el, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  // Настройка сортировки элементов
  const [, refDrop] = useDrop({
    accept: "constructorElement",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        // Элемент находится на самом себе, ничего не делаем
        return; 
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Проверяем, куда двигается элемент в зависимости от положения мыши
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        // Элемент двигается вниз и находится выше центра, ничего не делаем
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        // Элемент двигается вверх и находится ниже центра, ничего не делаем
        return;
      }

      // Если ни одно из вышеперечисленных условий не выполняется, меняем порядок элементов
      dispatch(moveIngredient({ dragIndex, hoverIndex }));

      item.index = hoverIndex; // Обновляем индекс элемента
    },
  });

  // Соединяем перетаскивание и сортировку
  dragRef(refDrop(ref));

  if (el.type !== "bun") {
    return (
      <li ref={ref} style={{ opacity }} className={`${styles.list_el}`}>
        <div className={styles.constructor__element}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
            handleClose={() => {
              dispatch(func(index));
            }}
          />
        </div>
      </li>
    );
  }
}

ConstructorElements.propTypes = {
  el: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};
