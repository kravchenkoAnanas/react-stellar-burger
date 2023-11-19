import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import socketMiddleware from "./middleware/socketMiddleware";
import { compose } from 'redux';
import { wsConfig } from './api';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(wsConfig),
  // socketMiddleware(wsConfig["url"], wsConfig["actions"]),
));
export const store = createStore(rootReducer, enhancer);