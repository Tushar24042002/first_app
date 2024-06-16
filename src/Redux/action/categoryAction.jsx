// actions/productAction.js
export const ALL_CATEGORY = "CATEGORY";
export const allCategory = data => {
  return {
    type: ALL_CATEGORY,
    payload: data,
  };
};
