import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errMess: null
    },action) => {
        
        switch (action.type) {
          case ActionTypes.LOGIN_SUCCESS:
            return {
              ...state,
              isAuthenticated: true,
              user: action.user,
              errMess: "",
              isLoading: false,
            };
          case ActionTypes.LOGIN_FAILURE:
            return {
              ...state,
              isLoading: false,
              isAuthenticated: false,
              errMess: action.message,
            };
          case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoading: true,
                 isAuthenticated: true };
          case ActionTypes.LOGOUT_SUCCESS:
            return {
              isLoading: false,
              isAuthenticated: false,
              token: "",
              user: null,
            };
          default:
            return state;
        }
    }