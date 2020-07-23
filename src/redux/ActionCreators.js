import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../firebase/firebase";
import firebase from 'firebase';
export const receiveLogin = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user: user,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message: message,
  };
};



export const googleLogin = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();

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

export const githubLogin = () => (dispatch) => {
  const provider =  new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      dispatch(receiveLogin(user));
      // ...
    })
    .catch(function (error) {
       dispatch(loginError(error.message));
    });


}

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  localStorage.removeItem("user");
  dispatch(receiveLogout());
};