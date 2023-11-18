import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./ingredientsDataReducer";
import { consctructorIngredientsReducer } from "./constructorIngredientsReducer";
import { infoIngredientReducer } from "./infoIngredientReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { userReducer } from "./userReducer";
import { wsOrdersFeedReducer } from "./wsOrdersFeedReducer";
import { wsProfileOrdersReducer } from "./wsProfileOrdersReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsDataReducer,
  dataConstructor: consctructorIngredientsReducer,
  infoIngredient: infoIngredientReducer,
  orderData: orderDetailsReducer,
  userData: userReducer,
  wsOrdersFeed: wsOrdersFeedReducer,
  wsProfileOrders: wsProfileOrdersReducer,
});
