// reducers/productReducer.js

import { ALL_CATEGORY } from "../action/categoryAction";

const initialState = {
    category: [],
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  