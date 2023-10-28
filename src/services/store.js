import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { wsOrdersFeedActions } from "./actions/wsOrdersFeedActions";
import { wsProfileOrdersActions } from "./actions/wsProfileOrdersActions";
import socketMiddleware from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers/rootReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleware(wsOrdersFeedActions),
      socketMiddleware(wsProfileOrdersActions)
    )
  )
);
