import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { AppState } from '../../constants'

const Navbar = (props) => {
  
  const isAuthenticated = props.appState === AppState.AUTHENTICATED;

  const logout = (event) => {
    event.preventDefault()
    axios.post('/auth/logout').then(response => {
      if (response.status === 200) {
        props.updateUser(AppState.LOGOUT, {
          email: null
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img alt="logo"
          src={process.env.PUBLIC_URL + '/graduation.png'}
          style={{width:32,height:32}}/>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/courses" className="nav-item nav-link">Courses</Link>
          <Link to="/progress" className="nav-item nav-link">Progress</Link>
        </div>
        <div className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <div className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </Link>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="#">My Account</Link>
                  <Link className="dropdown-item" to="#">Settings</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" onClick={logout} to="#">Logout</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item nav-link">Sign In</Link>
              <Link to="/register" className="nav-item nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);