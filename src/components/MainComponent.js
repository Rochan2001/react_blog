import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import { googleLogin, logoutUser, githubLogin, fetchArticles } from "../redux/ActionCreators";
import { connect } from 'react-redux';
import { Switch, Route, Redirect} from "react-router-dom";



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
              <Route path="/home" component={HomePage} />
              <Redirect to="/home" />
            </Switch>
            <Footer />
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);