import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useDrag } from 'react-dnd';
import { addIngredientToModal, deleteIngredientFromModal } from '../../../services/actions/modalActions';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCSS from './BurgerIngredient.module.css';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';

import PropTypes from 'prop-types';

function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = React.useState(false);
  const ingredients = useSelector(store => {
    const { constructor } = store;

    if (!constructor.bun && !constructor.stuffings) {
      return [];
    }

    const { bun, stuffings } = constructor;

    return stuffings
      ? [bun, bun, ...stuffings]
      : [bun, bun];
  });

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const handleOpenModal = useCallback(() => {
    dispatch(addIngredientToModal(ingredient));
    setModalOpen(true);
  }, [dispatch, ingredient]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    dispatch(deleteIngredientFromModal());
  }, [dispatch]);


  const counter = () => ingredients.filter(item => item?._id === ingredient._id).length;
  const count = counter();

  // React.useEffect(() => {
  //   console.log('Стате упдатед', count);
  // }, [count]);

  return (
    <>
      <li className={BurgerIngredientCSS.ingredient__link} onClick={handleOpenModal} ref={dragRef}>
        <img src={ingredient.image} alt={ingredient.name} />
        <p className={`${BurgerIngredientCSS.ingredient__price} text text_type_digits-default pb-1 pt-1`}>
          {ingredient.price} &nbsp;
          <CurrencyIcon type="primary" />
        </p>
        <h3 className={`${BurgerIngredientCSS.ingredient__title} text text_type_main-default`}>
          {ingredient.name}
        </h3>
        { count > 0 && <Counter count={count} size="default" extraClass="m-1" /> }
      </li>
      { isModalOpen && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      ) }
    </>
  );
}

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired
};

export default BurgerIngredient;
