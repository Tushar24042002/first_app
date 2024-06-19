import React, { useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getCurrentUser, handleCheckout, handleRazorPay } from './CheckOutAction';
import { useAppContext } from '../../component/Contexts/Context';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const UserDetailsForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { cart, userDetails, setUserDetails } = useAppContext();
  const { user } = useSelector((state) => state);

  // Fetch current user details on component mount
  useEffect(() => {
    if (user != null && Object.keys(user).length === 0) {
      setUserDetails(user);
    } else {
      getCurrentUser(setUserDetails, dispatch);
    }
  }, []);

  // Update user details state onChange
  const handleChange = (key, value) => {
    setUserDetails({
      ...userDetails,
      [key]: value,
    });
  };

  // Handle payment response from Razorpay
  const setPaymentData = (e) => {
    handleRazorPay(e).then((res) => {
      navigation.navigate('paymentsuccess', {
        headerTitle: res?.message,
        order_id: e.order_id,
      });
    });
  };

  // Start Razorpay payment process
  const startPayment = (data) => {
    var options = {
      description: data?.description,
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: data?.key,
      amount: data?.amount,
      name: data?.name,
      order_id: data?.order_id,
      prefill: {
        email: data?.prefill?.email,
        contact: data?.prefill?.contact,
        name: data?.prefill?.name,
      },
      theme: { color: 'blue' }, // Customize button color here
    };
    RazorpayCheckout.open(options)
      .then((e) => {
        e.order_id = data?.order_id;
        setPaymentData(e);
      })
      .catch((error) => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  // Handle form submission (checkout process)
  const handleSubmit = () => {
    handleCheckout(100, cart, userDetails).then((res) => {
      startPayment(res?.razorpay_options);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={userDetails.first_name}
          onChangeText={(text) => handleChange('first_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={userDetails.last_name}
          onChangeText={(text) => handleChange('last_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={userDetails.mobile}
          onChangeText={(text) => handleChange('mobile', text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userDetails.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={userDetails.address_value}
          onChangeText={(text) => handleChange('address_value', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={userDetails.pincode}
          onChangeText={(text) => handleChange('pincode', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={userDetails.city}
          onChangeText={(text) => handleChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={userDetails.state}
          onChangeText={(text) => handleChange('state', text)}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default UserDetailsForm;
