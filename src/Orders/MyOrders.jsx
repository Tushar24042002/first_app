import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getOrders} from './MyOrderAction';

const MyOrders = () => {
 const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => {
      setOrders(res?.orders);
    });
  }, []);

  const renderOrder = ({item}) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderDetails}>
        <Image source={{uri: item.product_images}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.productPrice}>Price: {item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddToCart = item => {
    console.log('Add to cart:', item);
  };

  return (
    <ScrollView style={styles.container}>
      {
        orders && orders.map((e, index)=>{
          return (
            <React.Fragment>
              <Text>{e.created_at}</Text>
    
            <FlatList
            data={e.cart_details}
            renderItem={renderOrder}
            keyExtractor={item => `${item.product_id}_${index}`}
          />
                  </React.Fragment>
          )
        })
      }
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal : 10,
    paddingBottom: 400,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius : 10,
    backgroundColor : "#c2c2c2"
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
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
  addToCartButton: {
    backgroundColor: '#ff6347',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyOrders;
