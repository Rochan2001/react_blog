import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../firebase/firebase";
import firebase from 'firebase';

export const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
});

export const addArticles = (articles) =>({
  type: ActionTypes.ADD_ARTICLES,
  payload: articles,
})

export const articlesFailed = (errmess) =>({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errmess,
})

export const fetchArticles = () => (dispatch) => {
  dispatch(articlesLoading(true));

   firestore
    .collection("articles")
    .get()
    .then((snapshot) => {
      let articles = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const _id = doc.id;
        articles.push({ _id, ...data });
      });
      return articles;
    })
    .then((dishes) => dispatch(addArticles(dishes)))
    .catch((error) => dispatch(articlesFailed(error.message)));
};

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