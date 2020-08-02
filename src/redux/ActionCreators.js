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

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (comment,article) => (dispatch) => {
  if (!auth.currentUser) {
    console.log("No user logged in!");
    return;
  }

  return firestore.collection('comments').add({
      author: {
        '_id': auth.currentUser.uid,
        'firstname': auth.currentUser.displayName
          ? auth.currentUser.displayName
          : auth.currentUser.email,
         'image': auth.currentUser.photoURL
         ? auth.currentUser.photoURL
          : null
      },
      article : article,
      comment: comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      
      firestore
        .collection('comments')
        .doc(docRef.id)
        .get() 
        .then((doc) => {
          if (doc.exists) {
            
            const data = doc.data();
            const _id = doc.id;
            let comment = { _id, ...data };
            dispatch(addComment(comment));
          } else {
            // doc.data() will be undefined in this case
            
            console.log("No such document!");
          }
        });
    })
    .catch((error) => {
      console.log("Post comments ", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};


export const fetchComments = () => (dispatch) => {
  return firestore.collection('comments').get()
    .then(snapshot => {
      let comments = [];
      snapshot.forEach(doc => {
        const data = doc.data()
        const _id = doc.id
        comments.push({ _id, ...data });
      });
      return comments;
    })
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const commentDelete = (commentId) => ({
  type: ActionTypes.DELETE_COMMENT,
  payload: commentId
});

export const deleteComment = (docId) => (dispatch) => {

  firestore.collection('comments').doc(docId).delete()
  .then(() =>{
    dispatch(commentDelete(docId));
    console.log('comment deleted');
  })
  .catch(error => dispatch(commentsFailed(error.message)))

}

export const postFavorite = (articleId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log("No user logged in!");
    return;
  }

  return firestore
    .collection("favorites")
    .add({
      user: auth.currentUser.uid,
      article: articleId,
    })
    .then((docRef) => {
      firestore
        .collection("favorites")
        .doc(docRef.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(fetchFavorites());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (articleId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log("No user logged in!");
    return;
  }

  var user = auth.currentUser;

  return firestore
    .collection("favorites")
    .where("user", "==", user.uid)
    .where("article", "==", articleId)
    .get()
    .then((snapshot) => {
      console.log(snapshot);
      snapshot.forEach((doc) => {
        console.log(doc.id);
        firestore
          .collection("favorites")
          .doc(doc.id)
          .delete()
          .then(() => {
            dispatch(fetchFavorites());
          });
      });
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
  if (!auth.currentUser) {
    console.log("No user logged in!");
    return;
  }

  var user = auth.currentUser;

  dispatch(favoritesLoading(true));

  return firestore
    .collection("favorites")
    .where("user", "==", user.uid)
    .get()
    .then((snapshot) => {
      let favorites = { user: user, articles: [] };
      snapshot.forEach((doc) => {
        const data = doc.data();
        favorites.articles.push(data.article);
      });
      console.log(favorites);
      return favorites;
    })
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING,
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess,
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites,
});

