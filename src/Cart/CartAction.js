import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLogin } from '../Home/Login/LoginAction';
import fetchWrapper from '../Api/fetchWrapper';



export const getCart = async (setCart) => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json', // Optional, adjust as needed
    };
    const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/carts/get_cart_items.php?action=getCartItems', {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data?.success) {
      setCart(data?.cartItems)
    }
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};

export const addCart = async (obj, navigation) => {

  try {
    // const token = checkLogin(navigation);
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/carts/add_cart_items.php', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj) // Ensure the object is stringified
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`There was a problem with the fetch operation: ${error.message}`);
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};



export const getWishList = async (setWishlistData) => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json', // Optional, adjust as needed
    };
    const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/wishlist/get_wishlist_items.php?action=getWishlistItems', {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data?.success) {
      setWishlistData(data?.wishlist_items)
    }
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};


export const addWishlist = async (obj, navigation) => {

  try {
    // const token = checkLogin(navigation);
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/wishlist/add_wishlist_items.php', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj) // Ensure the object is stringified
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};



export const removeWishlist = async (obj) => {

  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetchWrapper('https://prediction.capitallooks.com/php_backend/wishlist/delete_wishlist_item.php', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(obj) // Ensure the object is stringified
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};