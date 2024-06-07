// reducers/productReducer.js

import { ALL_PRODUCT } from "../action/productAction";

const initialState = {
    products: [],
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_PRODUCT:
        return {
          ...state,
          products: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  