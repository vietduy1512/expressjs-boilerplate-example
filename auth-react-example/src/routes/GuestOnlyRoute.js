import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AppState } from 'constants/app'
import { connect } from 'react-redux';

function GuestOnlyRoute({ postLogout, appState, children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (appState !== AppState.AUTHENTICATED) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  appState: state.app.state
});

export default connect(mapStateToProps, {})(GuestOnlyRoute);