import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Auth} from './auth';
import {Articles} from './articles';

export const ConfigureStore = () => {
    
    const store = createStore(
      combineReducers({
        auth:Auth,
        articles:Articles,
      }),

      applyMiddleware(thunk, logger)

    );

    return store;
}