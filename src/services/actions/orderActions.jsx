import { request } from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export const sendOrder = (ingredients, orderModalOpen) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
    };

    return (dispatch) => {
        dispatch({
            type: SEND_ORDER_REQUEST
        });

        request('orders', options)
            .then(({ order }) => {
                dispatch({
                    type: SEND_ORDER_SUCCESS,
                    order
                });
                orderModalOpen();
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: SEND_ORDER_FAILED
                });
            });
    };
};
