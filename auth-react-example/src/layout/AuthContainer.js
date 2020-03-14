import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'

import RegisterForm from '../components/Auth/RegisterForm'
import LoginForm from '../components/Auth/LoginForm'
import Navbar from '../components/Common/Navbar'
import HomePage from '../components/Auth/HomePage'

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
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
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {this.state.loggedIn &&
          <p>Welcome, {this.state.email}!</p>
        }
        <Route
          exact path="/"
          component={HomePage} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/register"
          render={() =>
            <RegisterForm/>}
        />

      </div>
    );
  }
}

export default Auth;
