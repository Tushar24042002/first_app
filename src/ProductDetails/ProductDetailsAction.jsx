export const productDetails = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`https://prediction.capitallooks.com/php_backend/products/get_peoduct_by_id.php?id=${id}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(`There was a problem with the fetch operation: ${error.message}`);
    }
  };
  