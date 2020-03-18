import React from 'react';
import { Route } from 'react-router-dom'

import RegisterForm from 'components/auth/RegisterForm'
import LoginForm from 'components/auth/LoginForm'
import HomePage from 'components/home/HomePage'
import PrivateRoute from './PrivateRoute'
import GuestOnlyRoute from './GuestOnlyRoute'

const RouterView = (props) => {
  return (<>
    <Route exact path="/">
      <HomePage/>
    </Route>
    <PrivateRoute path="/courses">
      <HomePage/>
    </PrivateRoute>
    <PrivateRoute path="/progress">
      <HomePage/>
    </PrivateRoute>
    <GuestOnlyRoute path="/login">
      <LoginForm/>
    </GuestOnlyRoute>
    <GuestOnlyRoute path="/register">
      <RegisterForm/>
    </GuestOnlyRoute>
  </>);
}

export default RouterView;