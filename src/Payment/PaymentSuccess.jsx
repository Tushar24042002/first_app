import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon, Button } from 'react-native-elements';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  var data = {
    paymentId: 123,
    orderId: 1234,
    address: '123 Main St, Springfield, USA',
    price: '$299.99',
    products: [
      { id: 1, name: 'Product 1', quantity: 2, price: '$100', imageUrl: 'https://via.placeholder.com/100' },
      { id: 2, name: 'Product 2', quantity: 1, price: '$199.99', imageUrl: 'https://via.placeholder.com/100' },
    ],
  };
  const { paymentId, orderId, address, price, products } = data; // Assuming these params are passed from the payment process

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
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
          <Icon name="check-circle" type="font-awesome" color="green" size={80} />
        </View>
        <Text style={styles.successText}>Payment Successful!</Text>
        <Text style={styles.message}>Thank you for your purchase.</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="id-card" type="font-awesome" color="#333" size={20} />
            <Text style={styles.detailText}>Payment ID: {paymentId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="barcode" type="font-awesome" color="#333" size={20} />
            <Text style={styles.detailText}>Order ID: {orderId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker" type="font-awesome" color="#333" size={20} />
            <Text style={styles.detailText}>Delivery Address: {address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="dollar" type="font-awesome" color="#333" size={20} />
            <Text style={styles.detailText}>Total Price: {price}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Order Products</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
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
    marginVertical: 20,
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
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
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
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: 'green',
  },
});

export default PaymentSuccess;
