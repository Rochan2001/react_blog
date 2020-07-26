import * as ActionTypes from "./ActionTypes";


export const Articles = (state={
        isLoading: true,
        articles: [],
        errmess: null,
    }, action) =>{
        switch (action.type) {
          case ActionTypes.ADD_ARTICLES:
            return {
              ...state,
              isLoading: false,
              errMess: null,
              articles: action.payload,
            };

          case ActionTypes.ARTICLES_LOADING:
            return { ...state, isLoading: true, errMess: null, articles: [] };

          case ActionTypes.ARTICLES_FAILED:
            return {
              ...state,
              isLoading: false,
              errMess: action.payload,
              articles: [],
            };

          default:
            return state;
        }
        
}