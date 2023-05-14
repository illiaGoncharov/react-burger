import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';

import { modalReducer } from './modalReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    modal: modalReducer,
    order: orderReducer
});