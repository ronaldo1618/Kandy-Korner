import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = props => {
  const handleLogout = () => {
    props.clearEmployee();
    props.history.push('/products');
  }
  return (
    <>
    { props.hasEmployee ? 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/products">Kandy Korner</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">

      <Nav className="mr-auto">
          {props.hasEmployee
          ?
            <Nav.Link className="nav-link" href="/products">Products</Nav.Link>
          : null
          }
          {props.hasEmployee
          ? 
            <Nav.Link className="nav-link" href="/employees">Employees</Nav.Link>
          : null
          }
          {props.hasEmployee
          ?
            <Nav.Link className="nav-link" href="/locations">Locations</Nav.Link>
          : null
          }
      </Nav>
      <Nav>
          {props.hasEmployee
          ? 
            <Nav.Link className="nav-link" onClick={handleLogout}>Logout</Nav.Link>
          :
            <Nav.Link className="nav-link" href="/login">Login</Nav.Link>
          }
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    : null}
    </>
  )
}

export default withRouter(NavigationBar);