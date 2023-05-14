import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

const preloadedState = {
  ingredients: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = applyMiddleware(thunk);

export const store = createStore(rootReducer, preloadedState, composeEnhancers(enhancer));
