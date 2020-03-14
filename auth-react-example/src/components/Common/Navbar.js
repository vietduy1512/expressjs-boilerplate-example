import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Navbar extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    axios.post('/auth/logout').then(response => {
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          email: null
        })
      }
    }).catch(error => {
      // TODO: 
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Logo</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {loggedIn ? (
              <>
                <Link className="nav-item nav-link active" onClick={this.logout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-item nav-link">Home</Link>
                <Link to="/login" className="nav-item nav-link">Login</Link>
                <Link to="/register" className="nav-item nav-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );

  }
}

export default Navbar