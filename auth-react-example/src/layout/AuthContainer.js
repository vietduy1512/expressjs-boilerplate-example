import React, { Component } from 'react';
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/common/Navbar'
import HomePage from '../components/auth/HomePage'

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      isLogout: false,
      email: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/auth/currentUser').then(response => {
      if (response.data.user) {
        this.setState({
          isAuthenticated: true,
          email: response.data.user.email
        })
      } else {
        this.setState({
          isAuthenticated: false,
          email: null
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar updateUser={this.updateUser} isAuthenticated={this.state.isAuthenticated} />
        
        {
          this.state.isAuthenticated &&
          <p>Welcome, {this.state.email}!</p>
        }

        <PrivateRoute container={this} exact path="/">
          <HomePage/>
        </PrivateRoute>
        <Route path="/login">
          <LoginForm updateUser={this.updateUser}/>
        </Route>
        <Route path="/register">
          <RegisterForm/>
        </Route>

        <ToastContainer />
      </div>
    );
  }
}

// TODO: Replace this container param with Redux
function PrivateRoute({ container, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (container.state.isAuthenticated) {
          return children;
        } else {
          if (container.state.isLogout) {
            container.setState({isLogout: false});
          } else {
            toast.error("Unauthorized! You need to login.")
          }
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          );
        }
      }}
    />
  );
}

export default Auth;
