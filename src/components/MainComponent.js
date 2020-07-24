import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import { googleLogin, logoutUser, githubLogin } from "../redux/ActionCreators";
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    auth : state.auth
})

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  logoutUser: () => dispatch(logoutUser()),
  githubLogin: () => dispatch(githubLogin()),
});
class Main extends Component{
    render(){
        return (
          <div>
            <Header
              auth={this.props.auth}
              googleLogin={this.props.googleLogin}
              githubLogin={this.props.githubLogin}
              logoutUser={this.props.logoutUser}
            />
            <Footer />
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);