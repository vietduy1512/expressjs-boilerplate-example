import { UPDATE_APP_STATE, UPDATE_APP_CURRENT_USER } from "./types";
import { AppState } from '../constants'
import axios from 'axios'

export const getUser = () => async (dispatch) => {
  let response = await axios.get('/auth/currentUser');
  let user = response.data.user;

  if (user) {
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
  } else {
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
};

export const login = (user) => async (dispatch) => {
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
