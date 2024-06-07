// actions/productAction.js
export const ALL_PRODUCT = "UPDATE_USER";
export const allproducts = data => {
  return {
    type: ALL_PRODUCT,
    payload: data,
  };
};
