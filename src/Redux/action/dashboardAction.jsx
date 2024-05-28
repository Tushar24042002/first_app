// actions/dashboardActions.js

export const FETCH_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const dashboardAction = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_DATA_REQUEST });
    try {
      const response = await fetch('https://your-api-endpoint.com/admin/dashboard');
      dispatch({
        type: FETCH_DASHBOARD_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DASHBOARD_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
