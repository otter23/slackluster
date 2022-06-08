import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//import slices of state:
import sessionReducer from './session';
import usersReducer from './users';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  //use redux's compose if redux dev tools unavailable
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
  // createStore is deprecated use configureStore instead in future
  //configure store has deep clone support
};

export default configureStore;
