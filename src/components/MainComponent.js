import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ArticleDetail from './ArticledetailComponent';
import Home from './HomeComponent';
import { googleLogin, logoutUser, githubLogin, fetchArticles } from "../redux/ActionCreators";
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";



const mapStateToProps = state => ({
    auth : state.auth,
    articles: state.articles,
})

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  logoutUser: () => dispatch(logoutUser()),
  githubLogin: () => dispatch(githubLogin()),
  fetchArticles: () => dispatch(fetchArticles()),
});
class Main extends Component{

  componentDidMount(){
    this.props.fetchArticles();
  }

    render(){

        const ArticleWithId = ({match}) => {
          return(

            
            <ArticleDetail article={this.props.articles.articles.filter((article) => article._id === match.params.articleId)[0]} />

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