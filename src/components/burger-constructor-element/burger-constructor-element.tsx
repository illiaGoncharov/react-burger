import { useRef, FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

import styles from "./burger-constructor-element.module.css";

import { TBurgerConstructorElementProps, TIngredient } from "../../utils/types";

const BurgerConstructorElement: FC<TBurgerConstructorElementProps> = ({
  ingredient,
  index,
  onMove,
  onDelete,
}) => {
  // Деструктуризация свойств ингредиента
  const { name, price, image, uuid } = ingredient;

  // Создание ссылки на DOM-элемент
  const ref = useRef<HTMLDivElement>(null);

  // Инициализация перетаскивания
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { index },
  });

  // Инициализация приема перетаскиваемого элемента
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    hover: (item: TIngredient & { index: number }, monitor) => {
      // Проверка наличия ссылки на текущий элемент
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Позиция текущего элемента
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Позиция указателя мыши
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Определение направления перемещения и обновление порядка элементов
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Привязка ссылок для перетаскивания и приема элемента
  dragRef(dropTarget(ref));

  // Закрываем окошко
  const handleClose = () => (uuid !== undefined ? onDelete(uuid) : null);

  return (
    <div className={styles.card} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={handleClose}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

export default BurgerConstructorElement;
