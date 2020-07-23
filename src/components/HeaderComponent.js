import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { a } from "react-router-dom";

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
    this.setState({ isNavOpen: !this.state.isNav });
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
                <a className="nav-link" href="/home">
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
                {!this.props.auth.isAuthenticated ? (
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                    {this.props.auth.isLoading ? (
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    ) : null}
                  </Button>
                ) : (
                  <div>
                    <div className="navbar-text mr-3">
                      {console.log(this.props.auth.user)}
                      {this.props.auth.user.displayName}
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
            <Button color="danger" onClick={this.handleGoogleLogin}>
              <span className="fa fa-google fa-lg"></span> Google
            </Button>
            <Button color="dark" onClick={this.handleGithubLogin}>
              <span className="fa fa-github fa-lg"></span> Github
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;