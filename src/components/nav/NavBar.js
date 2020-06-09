import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const handleLogout = () => {
    props.clearEmployee();
    props.history.push('/products');
  }
  return (
    <>
    { props.hasEmployee ? 
    <header>
      <h1>
        Kandy Korner
      </h1>
      <nav>
        <ul>
          {props.hasEmployee
          ? <li>
              <Link className="nav-link" to="/products">Products</Link>
            </li>
          : null
          }
          {props.hasEmployee
          ? <li>
              <Link className="nav-link" to="/employees">Employees</Link>
            </li>
          : null
          }
          {props.hasEmployee
          ? <li>
              <Link className="nav-link" to="/locations">Locations</Link>
            </li>
          : null
          }
          {props.hasEmployee
          ? 
            <li>
              <span className="nav-link" onClick={handleLogout}>Logout</span>
            </li>
          : <li>
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          }
        </ul>
      </nav> 
    </header>
    : null}
    </>
  )
}

export default withRouter(NavBar);