import React from 'react';
import { Route } from 'react-router-dom'

import RegisterForm from 'components/auth/RegisterForm'
import LoginForm from 'components/auth/LoginForm'
import HomePage from 'components/home/HomePage'
import PrivateRoute from 'routes/PrivateRoute'

const RouterView = (props) => {
  return (<>
    <PrivateRoute exact path="/">
      <HomePage/>
    </PrivateRoute>
    <PrivateRoute path="/courses">
      <HomePage/>
    </PrivateRoute>
    <PrivateRoute path="/progress">
      <HomePage/>
    </PrivateRoute>
    <Route path="/login">
      <LoginForm/>
    </Route>
    <Route path="/register">
      <RegisterForm/>
    </Route>
  </>);
}

export default RouterView;