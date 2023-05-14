import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import PropTypes from 'prop-types';
import { burgerIngredientsPropTypes } from "../../../utils/types";

import ConstructorCSS from "../BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const DraggableItem = ({ elem, index, moveElement, deleteElement }) => {
    const { id } = elem;
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'constuctorIngredient',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveElement(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'constuctorIngredient',
        item: () => ({ id, index }),
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={`${ConstructorCSS.constructor__item}`}>
            <span className={ConstructorCSS.constructor__drag_icon}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
                handleClose={() => deleteElement(elem.id)}
            />
        </div>
    );
};

DraggableItem.propTypes = {
    elem: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    moveElement: PropTypes.func.isRequired,
    deleteElement: PropTypes.func.isRequired,
};

export default DraggableItem;
