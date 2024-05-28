// reducers/dashboardReducer.js
import {
    FETCH_DASHBOARD_DATA_REQUEST,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILURE,
  } from '../action/dashboardAction';
  
  const initialState = {
    loading: false,
    totalProducts: 0,
    totalEarnings: 0,
    totalOrders: 0,
    error: null,
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DASHBOARD_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          totalProducts: action.payload.totalProducts,
          totalEarnings: action.payload.totalEarnings,
          totalOrders: action.payload.totalOrders,
        };
      case FETCH_DASHBOARD_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  