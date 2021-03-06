import * as types from './ActionTypes.js';
import { API_URL } from '../../environment.js';

export function login() {
  return (dispatch, getState) => {
    let { email, password } = getState().authState;
    fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        dispatch(setCurrentUser({ currentUser: data.user }));
      }
    })
    .catch(error => {
      console.log('AuthActions.js: login(user): An error occurred while POSTing to /api/login');
      throw error;
    });
  };
}

export function onLoginAnimationCompleted() {
  return {
    type: types.ON_LOGIN_ANIMATION_COMPLETED,
  };
};

export function setCurrentUser({ currentUser }) {
  return {
    type: types.SET_CURRENT_USER,
    currentUser,
  };
}

export function setEmail(email) {
  return {
    type: types.SET_EMAIL,
    email,
  };
};

export function setPassword(password) {
  return {
    type: types.SET_PASSWORD,
    password,
  };
};