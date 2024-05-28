import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppContext } from '../../component/Contexts/Context';
import { checkLogin } from '../Home/Login/LoginAction';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const { cart, setCart } = useAppContext();
  const navigation = useNavigation();

  useEffect(() => {
    checkLogin(navigation);
  }, []);

  const increaseQuantity = index => {
    const newCarts = [...cart];
    newCarts[index].quantity += 1;
    setCart(newCarts);
  };

  const decreaseQuantity = index => {
    const newCarts = [...cart];
    if (newCarts[index].quantity > 1) {
      newCarts[index].quantity -= 1;
      setCart(newCarts);
    }
  };

  return (
    <View style={styles.container}>
      {cart === undefined || cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={100} color="#ccc" />
          <Text style={styles.emptyText}>Your Cart is empty</Text>
        </View>
      ) :
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cart.map((cartItem, index) => (
          <View key={index} style={styles.cartBox}>
            <Image
              source={{ uri: cartItem.product_image }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{cartItem.name}</Text>
              <Text style={styles.category}>{cartItem.category}</Text>
            </View>
            <View style={styles.priceQuantity}>
              <Text style={styles.price}>
                {' '}
                <FontAwesome name="rupee" size={14} color="black" />
                {cartItem.price}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => decreaseQuantity(index)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{cartItem.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increaseQuantity(index)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView> }
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('userDetailsForm', { headerTitle: 'User Details' })}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 60, // Add padding at the bottom to prevent content being hidden behind the button
  },
  cartBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  priceQuantity: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
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

export default Cart;
