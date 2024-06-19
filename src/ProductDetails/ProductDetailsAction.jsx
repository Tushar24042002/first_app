import fetchWrapper from "../Api/fetchWrapper";

export const productDetails = async (id) => {
    try {
      const response = await fetchWrapper(`https://prediction.capitallooks.com/php_backend/products/get_peoduct_by_id.php?id=${id}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`There was a problem with the fetch operation: ${error.message}`);
    }
  };
  