// actions/productActions.js

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Existing fetchProducts function
export const fetchProductsFromApi = async (category) => {
  let smallCategory = category.toLowerCase();
  try {
    const response = await fetch(
      `https://prediction.capitallooks.com/php_backend/products/get_all_product.php${
        smallCategory !== '' ? '?type=' + encodeURIComponent(smallCategory) : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`
    );
  }
};

export const fetchProducts = (category) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const data = await fetchProductsFromApi(category);
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
