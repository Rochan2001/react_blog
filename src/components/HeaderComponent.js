import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
         Button, Modal, ModalHeader, ModalBody,Col, Row } from 'reactstrap';

import { auth } from "../firebase/firebase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleGithubLogin = this.handleGithubLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  


  handleLogout() {
    this.props.logoutUser();
  }

  handleGithubLogin(){
    this.toggleModal();
    this.props.githubLogin();
  }

  handleGoogleLogin(){
    this.toggleModal();
    this.props.googleLogin();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render() {
    return (
      <div>
        <Navbar dark color="dark" expand="md">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="../assets/images/logo.png"
              alt="logo"
              height="30"
              width="31"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <a className="nav-link" href="/home">
                  Home
                </a>
              </NavItem>
              <NavItem>
                <a className="nav-link" href="/favorites">
                  Favorites
                </a>
              </NavItem>
              <NavItem>
                <a className="nav-link" href="/home">
                  About us
                </a>
              </NavItem>
              <NavItem>
                <a className="nav-link" href="/home">
                  Contact us
                </a>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {!auth.currentUser ? (
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                    {this.props.auth.isLoading ? (
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    ) : null}
                  </Button>
                ) : (
                  <div>
                    <div className="navbar-text mr-3">
                      {auth.currentUser.displayName}
                    </div>
                    <Button outline onClick={this.handleLogout}>
                      <span className="fa fa-sign-out fa-lg"></span> Logout
                      {this.props.auth.isLoading ? (
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      ) : null}
                    </Button>
                  </div>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader className="modal-color" toggle={this.toggleModal}>
            <h3 style={{ color: "white" }} className="text-center">
              Login
            </h3>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <Button color="danger" onClick={this.handleGoogleLogin}>
                  <span className="fa fa-google fa-lg"></span> Google
                </Button>
              </Col>
              <Button
                className="ml-5"
                color="dark"
                onClick={this.handleGithubLogin}
              >
                <span className="fa fa-github fa-lg"></span> Github
              </Button>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}



export default Header;