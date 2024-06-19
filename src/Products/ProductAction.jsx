// api.js

import fetchWrapper from "../Api/fetchWrapper";

export const fetchProducts = async (type, category) => {
  let smallType = type ? type.toLowerCase() : '';
  let url = 'https://prediction.capitallooks.com/php_backend/products/get_all_product.php';

  if (smallType != '') {
    url += `?type=${encodeURIComponent(smallType)}`;
    if (category != '') {
      url += `&category=${encodeURIComponent(category)}`;
    }
  }

  try {
    const response = await fetchWrapper(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};

export const fetchProductById = async e => {
  try {
    const response = await fetchWrapper(
      `https://prediction.capitallooks.com/php_backend/products/getProductCategory.php?product_type=${e}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};
