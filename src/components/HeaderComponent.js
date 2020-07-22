import React, { Component } from "react";
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Button } from 'reactstrap';

class Header extends Component {
    
    constructor(props) {
        super (props);
        this.state = {
          isNavOpen: false,
        };
    }

    toggleNav(){
        this.setState({ isNavOpen: !this.state.isNav});
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
                    <NavLink className="nav-link" to="/home">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      Favorites
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      About us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      Contact us
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Button outline onClick={this.toggleModal}>
                        Login
                    </Button>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}

export default Header;