import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Films} from './Films'
import {Characters} from './Characters'
import {Genres} from './Genres'
import {List} from './List'




export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to={"/"}>React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/films"}>
                    Films
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/genres"}>
                    Genres
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/characters"}>
                    Characters
                  </Nav.Link>
                  <NavDropdown title="Lists" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/film-list"}>
                      Films
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <Switch>
              <Route path="/films">
                <Films />
              </Route>
              <Route path="/genres">
                <Genres />
              </Route>
              <Route path="/characters">
                <Characters/>
              </Route>
              <Route path="/film-list">
                <List/>
              </Route>
              <Route path="/">
                <Films />
              </Route>
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}
