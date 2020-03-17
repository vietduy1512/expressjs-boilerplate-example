import { UPDATE_APP_STATE, UPDATE_APP_CURRENT_USER } from "actions/types";
import { AppState } from 'constants/app'

const initialState = {
  state: AppState.LOADING,
  user: {
    email: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return {
        ...state,
        state: action.appState
      };
    case UPDATE_APP_CURRENT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.user.email
        }
      };
    default:
      return state;
  }
}
