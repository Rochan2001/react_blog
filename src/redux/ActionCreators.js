import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../firebase/firebase";

export const receiveLogin = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};


export const googleLogin = () => (dispatch) => {
  const provider = new auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      // Dispatch the success action
      dispatch(receiveLogin(user));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
    });
};
