import AsyncStorage from '@react-native-async-storage/async-storage';
export const checkLogin = async (navigation) => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`, // Assuming your token is stored as 'token' in localStorage
      'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await fetch('https://prediction.capitallooks.com/php_backend/config/checkToken.php', {
      method: 'GET', // or 'POST' or any other HTTP method
      headers: headers // Pass the headers object
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if(data.success !== true){
      navigation.navigate('home', { headerTitle: "Home", id: 1 })
    }
    return token;
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};


export const loginStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('Authorization');
    const headers = {
      'Authorization': `${token}`, // Assuming your token is stored as 'token' in localStorage
      'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await fetch('https://prediction.capitallooks.com/php_backend/config/checkToken.php', {
      method: 'GET', // or 'POST' or any other HTTP method
      headers: headers // Pass the headers object
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if(data.success !== true){
     return false;
    }
    return true;
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};


export const loginUser = async (username, password) => {
  try {
    const requestBody = {
      email: username,
      password: password
    };

    const response = await fetch('https://prediction.capitallooks.com/php_backend/Users/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
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

export const registerUser = async (username, email, password, phoneNumber) => {
  try {
    const requestBody = {
      firstName: username,
      lastName: "dummy",
      email: email,
      password: password,
      phoneNumber: phoneNumber
    };
    const response = await fetch('https://prediction.capitallooks.com/php_backend/Users/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
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
