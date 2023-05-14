import PropTypes from 'prop-types';
import ConstructorCSS from "../BurgerConstructor.module.css";
import { useMemo } from 'react';

import burgerImagePath from '../../../images/burger.svg';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const EmptyContainer = ({ text, type = 'other' }) => {
  const elementProps = useMemo(() => ({
    type,
    text,
    isLocked: true,
    thumbnail: burgerImagePath,
    price: 0,
  }), [type, text]);

  return (
      <div className={ConstructorCSS.item}>
      <ConstructorElement {...elementProps} />
    </div>
  );
};

EmptyContainer.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default EmptyContainer;
