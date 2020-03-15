import React, { Component } from 'react';
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/common/Navbar'
import HomePage from '../components/home/HomePage'
import { AppState } from '../constants'

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      appState: AppState.LOADING,
      email: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    await this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  async getUser() {
    let response = await axios.get('/auth/currentUser');
    if (response.data.user) {
      await this.setState({
        appState: AppState.AUTHENTICATED,
        email: response.data.user.email
      })
    } else {
      await this.setState({
        appState: AppState.GUEST,
        email: null
      })
    }
  }

  render() {
    const isLoading = this.state.appState === AppState.LOADING;
    return (
      <div>
        {
          isLoading ? 
          (<>

          </>) : (<>
            <Navbar updateUser={this.updateUser} appState={this.state.appState} />
    
            <PrivateRoute container={this} exact path="/">
              <HomePage/>
            </PrivateRoute>
            <PrivateRoute container={this} path="/courses">
              <HomePage/>
            </PrivateRoute>
            <PrivateRoute container={this} path="/progress">
              <HomePage/>
            </PrivateRoute>
            <Route path="/login">
              <LoginForm updateUser={this.updateUser}/>
            </Route>
            <Route path="/register">
              <RegisterForm/>
            </Route>
    
            <ToastContainer />
          </>)
        }
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
        switch (container.state.appState) {
          case AppState.LOADING:
            return <></>;

          case AppState.AUTHENTICATED:
            return children;

          case AppState.LOGOUT:
            container.updateUser({appState: AppState.GUEST});
            break;

          default:
            toast.error("Unauthorized! You need to login.")
            break;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
}

export default Auth;
