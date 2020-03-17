import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'

import RegisterForm from 'components/auth/RegisterForm'
import LoginForm from 'components/auth/LoginForm'
import Navbar from 'components/common/Navbar'
import HomePage from 'components/home/HomePage'
import { AppState } from 'constants/app'
import { getUser } from 'actions/appAction'
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute'

const Auth = (props) => {
  
  useEffect(() => {
    props.getUser();
    // eslint-disable-next-line
  }, [])
  
  const isLoading = props.appState === AppState.LOADING;

  return (
    <div>
      {
        isLoading ? 
        (<>

        </>) : (<>
          <Navbar/>
  
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
        </>)
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  appState: state.app.state,
  currentUser: state.app.user
});

export default connect(mapStateToProps, { getUser })(Auth);