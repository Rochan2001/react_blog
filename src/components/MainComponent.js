import React, { Component } from 'react';
import Header from './HeaderComponent';
import { googleLogin, logoutUser } from "../redux/ActionCreators";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    auth : state.auth
})

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  logoutUser: () => dispatch(logoutUser()),
});
class Main extends Component{
    render(){
        return (
          <Header auth={this.props.auth}
                  googleLogin={this.props.googleLogin}
                  logoutUser={this.props.logoutUser} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);