import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ArticleDetail from './ArticledetailComponent';
import Home from './HomeComponent';
import Favorites from './FavoriteComponent';
import { 
       googleLogin, 
       logoutUser, 
       githubLogin, 
       fetchArticles, 
       postComment, 
       fetchComments,
       deleteComment, 
       postFavorite,
       fetchFavorites,
       deleteFavorite, } from "../redux/ActionCreators";
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { auth } from "../firebase/firebase";
const mapStateToProps = state => ({
    auth : state.auth,
    articles: state.articles,
    comments: state.comments,
    favorites: state.favorites,
})

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  logoutUser: () => dispatch(logoutUser()),
  githubLogin: () => dispatch(githubLogin()),
  fetchArticles: () => dispatch(fetchArticles()),
  postComment: (comment,article) => dispatch(postComment(comment,article)),
  fetchComments: () => dispatch(fetchComments()),
  deleteComment: (docId) => dispatch(deleteComment(docId)),
  postFavorite: (articleId) => dispatch(postFavorite(articleId)),
  fetchFavorites: () => dispatch(fetchFavorites()),
  deleteFavorite: (articleId) => dispatch(deleteFavorite(articleId)),
});
class Main extends Component{

  componentDidMount(){
    this.props.fetchArticles();
    this.props.fetchComments();
    setTimeout(()=>{this.props.fetchFavorites()}, 5000);
    // if(auth.currentUser)
    // console.log(auth.user.photoURL);
  }

    render(){

        const ArticleWithId = ({match}) => {
          return(
              <ArticleDetail article={this.props.articles.articles.filter((article) => article._id === match.params.articleId)[0]}
                             isLoading={this.props.articles.isLoading}
                             errMess={this.props.articles.errMess}
                             postComment={this.props.postComment}
                             comments={this.props.comments.comments.filter((comment) => comment.article === match.params.articleId)} 
                             deleteComment={this.props.deleteComment}
                           />
          );
        }

        const HomePage = () => {
          return auth.currentUser &&
            this.props.favorites.favorites ? (
            <Home
              isLoading={this.props.articles.isLoading}
              errMess={this.props.articles.errMess}
              articles={this.props.articles}
              postFavorite={this.props.postFavorite}
              favoriteArticles={this.props.favorites.favorites.articles}
              deleteFavorite={this.props.deleteFavorite}
            />
          ) : (
            <Home
              isLoading={this.props.articles.isLoading}
              errMess={this.props.articles.errMess}
              articles={this.props.articles}
              postFavorite={this.props.postFavorite}
              favoriteArticles={[]}
              deleteFavorite={this.props.deleteFavorite}
            />
          );
        };

      const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
         <Component {...props} />
        )} />
      );

        return (
          <div>
            <Header
              auth={this.props.auth}
              googleLogin={this.props.googleLogin}
              githubLogin={this.props.githubLogin}
              logoutUser={this.props.logoutUser}
            />
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route path="/home/:articleId" component={ArticleWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} articles={this.props.articles}  />} />
              <Redirect to="/home" />
            </Switch>
            <Footer />
          </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));