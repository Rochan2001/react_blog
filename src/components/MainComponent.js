import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ArticleDetail from './ArticledetailComponent';
import Home from './HomeComponent';
import { googleLogin, logoutUser, githubLogin, fetchArticles, postComment, fetchComments } from "../redux/ActionCreators";
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";


const mapStateToProps = state => ({
    auth : state.auth,
    articles: state.articles,
    comments: state.comments,
})

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  logoutUser: () => dispatch(logoutUser()),
  githubLogin: () => dispatch(githubLogin()),
  fetchArticles: () => dispatch(fetchArticles()),
  postComment: (comment,article) => dispatch(postComment(comment,article)),
  fetchComments: () => dispatch(fetchComments()),
});
class Main extends Component{

  componentDidMount(){
    this.props.fetchArticles();
    this.props.fetchComments();
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
                           comments={this.props.comments.comments.filter((comment) => comment.article === match.params.articleId)} />

          );
        }

        const HomePage = () => {
          return (
            <Home isLoading={this.props.articles.isLoading}
                  errMess={this.props.articles.errMess}
                  articles={this.props.articles} />
          );
        };
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
              <Redirect to="/home" />
            </Switch>
            <Footer />
          </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));