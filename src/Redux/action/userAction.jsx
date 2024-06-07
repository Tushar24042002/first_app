// actions/userActions.js
export const USER_DETAILS = "USER_DETAILS";
export const LOGIN_DETAILS = "LOGIN_DETAILS";
export const userDetails = user => {
  return {
    type: USER_DETAILS,
    payload: user,
  };
};

export const loginDetails = data => {
  return {
    type: LOGIN_DETAILS,
    payload: data,
  };
};
