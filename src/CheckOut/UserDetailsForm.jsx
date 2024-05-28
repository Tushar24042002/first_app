import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {getCurrentUser, handleCheckout, handleRazorPay} from './CheckOutAction';
import {useAppContext} from '../../component/Contexts/Context';
import RazorpayCheckout from 'react-native-razorpay';

const UserDetailsForm = () => {
  const {cart, userDetails, setUserDetails} = useAppContext();
  // const [userDetails, setUserDetails] = useState({
  //   first_name: '',
  //   last_name: '',
  //   mobile: '',
  //   email: '',
  //   address_value: '',
  //   pincode: '',
  //   city: '',
  //   state: '',
  // });

  useEffect(() => {
    console.log('get form');
    getCurrentUser(setUserDetails);
  }, []);
  console.log(userDetails);
  const handleChange = (key, value) => {
    setUserDetails({
      ...userDetails,
      [key]: value,
    });
  };

  const setPaymentData = e => {
    handleRazorPay(e);
    console.log('end function');
  };

  const startPayment = data => {
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
      theme: {color: 'blue'},
    };
    RazorpayCheckout.open(options)
      .then(e => {
        e.order_id = data?.order_id;
        setPaymentData(e);
        // alert(`Success: ${e.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const handleSubmit = () => {
    handleCheckout(100, cart, userDetails).then(res => {
      console.log(res, 'resp');
      startPayment(res?.razorpay_options);
    });
    console.log(userDetails); // For demonstration, you can remove this line later
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Details Form</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={userDetails.first_name}
        onChangeText={text => handleChange('first_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={userDetails.last_name}
        onChangeText={text => handleChange('last_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={userDetails.mobile}
        onChangeText={text => handleChange('mobile', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userDetails.email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userDetails.address_value}
        onChangeText={text => handleChange('address_value', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={userDetails.pincode}
        onChangeText={text => handleChange('pincode', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={userDetails.city}
        onChangeText={text => handleChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={userDetails.state}
        onChangeText={text => handleChange('state', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  }
});

export default UserDetailsForm;
