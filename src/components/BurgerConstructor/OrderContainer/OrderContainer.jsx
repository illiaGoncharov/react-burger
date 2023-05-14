import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ConstructorCSS from "../BurgerConstructor.module.css";

import Modal from "../../Modal/Modal";
import OrderDetails from "../../OrderDetails/OrderDetails";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetIngredients } from '../../../services/actions/constructorActions';
import { sendOrder } from '../../../services/actions/orderActions';

const OrderContainer = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setModalOpen] = React.useState(false);
    const { bun, stuffings } = useSelector(store => store.constructor);
    const { hasError } = useSelector(store => store.order);

    const totalPrice = useMemo(() => {
        if (stuffings || bun) {
            return (stuffings ? stuffings.reduce((sum, item) => sum + item.price, 0) : 0) + (bun ? bun.price * 2 : 0);
        } else {
            return 0;
        }
    }, [bun, stuffings]);

    const orderModalOpen = () => {
        setModalOpen(true);
    };

    const orderModalClose = () => {
        setModalOpen(false);
        dispatch(resetIngredients());
    };

    const handleSubmit = () => {
        const ingredientsId = [bun, ...stuffings, bun].map(item => item._id);
        dispatch(sendOrder(ingredientsId, orderModalOpen));
    }

    return (
        <>
            <div className={`${ConstructorCSS.constructor__wrap} mt-10 mr-5`}>
                <p className={`${ConstructorCSS.constructor__total} text text_type_digits-medium`}>   {totalPrice} &nbsp;
                    <CurrencyIcon type="primary" />
                </p>
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="small" 
                    extraClass="ml-2 text_type_main-default" 
                    onClick={handleSubmit} 
                    disabled={!stuffings || !stuffings.length || !bun}> Оформить заказ
                </Button>
                { isModalOpen &&
                    <Modal onClose={orderModalClose}>
                        <OrderDetails />
                    </Modal> }
            </div>
            { hasError &&
                <span className={`text text_type_main-small`}>
                    Произошла ошибка при формировании заказа!
                </span> }
        </>
    );
}

export default OrderContainer; 