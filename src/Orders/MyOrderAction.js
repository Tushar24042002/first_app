import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchWrapper from "../Api/fetchWrapper";

export const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('Authorization');
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json', // Optional, adjust as needed
      };
      const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/Orders/get_all_order_user_id.php', {
        method: 'GET',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`There was a problem with the fetch operation: ${error.message}`);
    }
  };