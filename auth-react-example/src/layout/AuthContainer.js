import React, { useEffect } from 'react';
import Navbar from 'components/common/Navbar'
import { AppState } from 'constants/app'
import { getUser } from 'actions/appAction'
import { connect } from 'react-redux';
import RouterView from 'routes/main';

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
          <RouterView/>
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