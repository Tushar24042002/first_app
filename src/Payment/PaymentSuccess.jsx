import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon, Button} from 'react-native-elements';
import { getPaymentDetailsByOrderId } from './PaymentDetailsAction';

const PaymentSuccess = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const {order_id} = route.params;
  // const route = useRoute();


useEffect(()=>{
  getPaymentDetailsByOrderId(order_id).then((res)=>{
    console.log(res)
    setData(res);
  })
},[])



  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item?.product_images}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.productPrice}>Price: {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon
            name="check-circle"
            type="font-awesome"
            color="green"
            size={80}
          />
        </View>
        <Text style={styles.successText}>Payment Successful!</Text>
        <Text style={styles.message}>Thank you for your purchase.</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="id-card" type="font-awesome" color="#333" size={16} />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detailText, styles.bold500]}>
                {' '}
                Payment ID:{' '}
              </Text>
              <Text style={styles.detailText}>{data?.payment_id}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
          <Icon name="barcode" type="font-awesome" color="#333" size={16} />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detailText, styles.bold500]}>
              Order ID: 
              </Text>
              <Text style={styles.detailText}>{order_id}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
          <Icon
              name="map-marker"
              type="font-awesome"
              color="#333"
              size={16}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detailText, styles.bold500]}>
                {' '}
                Delivery Address: 
              </Text>
              <Text style={styles.detailText}>{`${data?.address?.address_value} ${data?.address?.state} ${data?.address?.pincode}`}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
          <Icon name="rupee" type="font-awesome" color="#333" size={16} />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detailText, styles.bold500]}>
                {' '}
                Total Price: 
              </Text>
              <Text style={styles.detailText}>{data?.order?.amount}</Text>
            </View>
          </View>

        </View>
        <Text style={styles.sectionTitle}>Order Products</Text>
        <FlatList
          data={data?.order?.cart_details}
          renderItem={renderProduct}
          keyExtractor={item => item?.product_id.toString()}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          buttonStyle={styles.continueButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 6,
  },
  bold500: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 0,
    marginBottom: 0,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  productQuantity: {
    fontSize: 12,
    color: '#555',
  },
  productPrice: {
    fontSize: 12,
    color: '#555',
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: 'green',
  },
});

export default PaymentSuccess;
