// api.js

import fetchWrapper from "../Api/fetchWrapper";
import { allCategory } from "../Redux/action/categoryAction";

export const getCategory = async (setProductCategory, dispatch) => {
  try {
    const response = await fetchWrapper(
      'https://prediction.capitallooks.com/php_backend/products/getProductTypes.php?action=getCartItems',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data?.success) {
      dispatch(allCategory(data?.productTypes))
      setProductCategory(data?.productTypes);
    }
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};
export const getSubCategory = async (setProductSubCategory , e) => {
  try {
    const response = await fetchWrapper(
      `https://prediction.capitallooks.com/php_backend/products/getProductCategory.php?product_type_id=${e}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data?.success) {
      setProductSubCategory(data?.productCategories);
    }
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};
