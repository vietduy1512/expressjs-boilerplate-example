import { UPDATE_APP_STATE, UPDATE_APP_CURRENT_USER } from "./types";
import { AppState } from 'constants/app'
import axios from 'axios'

export const getUser = () => async (dispatch) => {
  try {
    let response = await axios.get('/auth/currentUser');
    let user = response.data.user;
    if (user) {
      dispatchAuth(dispatch, user);
    } else {
      dispatchGuest(dispatch);
    }
  } catch (error) {
    dispatchGuest(dispatch);
  }
};

export const login = (user) => async (dispatch) => {
  dispatchAuth(dispatch, user);
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: UPDATE_APP_STATE,
    appState: AppState.POST_LOGOUT
  });
  dispatch({
    type: UPDATE_APP_CURRENT_USER,
    user: {
      email: null
    }
  });
};

export const postLogout = () => async (dispatch) => {
  dispatch({
    type: UPDATE_APP_STATE,
    appState: AppState.GUEST
  });
};

const dispatchAuth = (dispatch, user) => {
  dispatch({
    type: UPDATE_APP_STATE,
    appState: AppState.AUTHENTICATED
  });
  dispatch({
    type: UPDATE_APP_CURRENT_USER,
    user: {
      email: user.email
    }
  });
}

const dispatchGuest = (dispatch) => {
  dispatch({
    type: UPDATE_APP_STATE,
    user: AppState.GUEST
  });
  dispatch({
    type: UPDATE_APP_CURRENT_USER,
    user: {
      email: null
    }
  });
}
