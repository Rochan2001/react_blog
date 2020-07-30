import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Auth} from './auth';
import {Articles} from './articles';
import {Comments} from './comments';

export const ConfigureStore = () => {
    
    const store = createStore(
      combineReducers({
        auth:Auth,
        articles:Articles,
        comments:Comments,
      }),

      applyMiddleware(thunk, logger)

    );

    return store;
}