import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/common/Navbar'
import HomePage from '../components/home/HomePage'
import { AppState } from '../constants'

const Auth = () => {
  
  const [appState, setAppState] = useState(AppState.LOADING);
  const [userData, setUserData] = useState({
    email: null
  });

  const isLoading = appState === AppState.LOADING;

  useEffect(() => {
    getUser();
  }, [])

  const updateUser = (appState, user) => {
    setAppState(appState);
    setUserData(user);
  }

  const getUser = async () => {
    let response = await axios.get('/auth/currentUser');
    console.log(response)
    if (response.data.user) {
      await setAppState(AppState.AUTHENTICATED)
      await setUserData({
        email: response.data.user.email
      })
    } else {
      await setAppState(AppState.GUEST)
      await setUserData({
        email: null
      })
    }
  }

  return (
    <div>
      {
        isLoading ? 
        (<>

        </>) : (<>
          <Navbar updateUser={updateUser} user={userData} appState={appState} />
  
          <PrivateRoute appState={appState} updateUser={updateUser} exact path="/">
            <HomePage/>
          </PrivateRoute>
          <PrivateRoute appState={appState} updateUser={updateUser} path="/courses">
            <HomePage/>
          </PrivateRoute>
          <PrivateRoute appState={appState} updateUser={updateUser} path="/progress">
            <HomePage/>
          </PrivateRoute>
          <Route path="/login">
            <LoginForm updateUser={updateUser}/>
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

// TODO: Replace this container param with Redux
function PrivateRoute({ appState, updateUser, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        switch (appState) {
          case AppState.LOADING:
            return <></>;

          case AppState.AUTHENTICATED:
            return children;

          case AppState.LOGOUT:
            updateUser({appState: AppState.GUEST});
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
