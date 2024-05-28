import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSearchResult = async query => {
    try {
      const token = await AsyncStorage.getItem('Authorization');
      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json', // Optional, adjust as needed
      };
      const response = await fetch(
        `https://prediction.capitallooks.com/php_backend/products/search.php?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: headers,
        },
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    //   if (data?.success) {
    //     // setUserDetails(data?.userDetails);
    //   }
    } catch (error) {
      throw new Error(
        `There was a problem with the fetch operation: ${error.message}`,
      );
    }
  };