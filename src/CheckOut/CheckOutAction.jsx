import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { userDetails } from '../Redux/action/userAction';

export const handleCheckout = async (amount, cartArray, userDetails) => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const requestBody = {
      amount: JSON.stringify(amount),
      productDetails: JSON.stringify(cartArray),
      userDetails: JSON.stringify(userDetails),
    };
    console.log(requestBody);
    const response = await fetch(
      'https://prediction.capitallooks.com/php_backend/payment/checkout.php',
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};

export const getCurrentUser = async setUserDetails => {
  const dispatch = useDispatch();
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      Authorization: `${token}`,
      'Content-Type': 'application/json', // Optional, adjust as needed
    };
    const response = await fetch(
      'https://prediction.capitallooks.com/php_backend/Users/get_user_by_id.php',
      {
        method: 'GET',
        headers: headers,
      },
    );
    console.log(response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data, 'res');
    if (data?.success) {
      dispatch(userDetails(data?.userDetails));
      setUserDetails(data?.userDetails);
      AsyncStorage.setItem("user",JSON.stringify(data?.userDetails));
    }
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};

export const handleRazorPay = async paymentData => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const requestBody = JSON.stringify(paymentData);
    const response = await fetch(
      'https://prediction.capitallooks.com/php_backend/payment/razorpay_payment.php',
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
};
