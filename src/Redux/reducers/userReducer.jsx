import { LOGIN_DETAILS, USER_DETAILS, loginDetails } from "../action/userAction";

// reducers/productReducer.js
const initialState = {
    user: {},
    loginData : {}
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_DETAILS:
        return {
          ...state,
          user: action.payload,
        };

        case LOGIN_DETAILS:
          return{
            ...state,
            loginData : action.payload
          }
      default:
        return state;
    }
  };
  
  export default userReducer;
  