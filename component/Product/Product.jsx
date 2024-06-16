import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MyImage from '../Image/MyImage';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {addWishlist, getWishList} from '../../src/Cart/CartAction';
import {useAppContext} from '../Contexts/Context';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Product = ({product, index}) => {
  const navigation = useNavigation();
  const {setWishlistData} = useAppContext();
  const [isWishlist, setIsWishlist] = useState(false);

  const addWishlistFunction = prodId => {
    let obj = {
      product_id: prodId,
    };
    addWishlist(obj, navigation).then(res => {
      if (res?.success) {
        getWishList(setWishlistData);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: res?.message,
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Add to Cart Failed',
          textBody: res?.error,
        });
      }
    });
  };
  const discountPercentage =
    (((Number(product?.mrp) || 0) - Number(product.price)) /
      (Number(product?.mrp) || 1)) *
    100;

  return (
    <TouchableOpacity
      key={index}
      style={styles.product}
      onPress={() =>
        navigation.navigate('productsDetail', {
          headerTitle: product.name,
          id: product.id,
        })
      }>
      <MyImage
        source={{uri: product?.product_images[0]}}
        style={styles.categoryImage}
      />
      <TouchableOpacity
        style={styles.wishlistIcon}
        onPress={() => addWishlistFunction(product.id)}>
        <Ionicons
          name={isWishlist ? 'heart' : 'heart-outline'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>
          <FontAwesome name="rupee" size={13} color="black" />
          {product?.price}
        </Text>
        <Text style={styles.productMrp}>
          <FontAwesome name="rupee" size={11} color="gray" />
          {product?.mrp || 0}
        </Text>
        {/* {discountPercentage && ( */}
        <Text style={styles.discountPercentage}>
          {discountPercentage.toFixed(0)}% OFF
        </Text>
        {/* )} */}
      </View>
      <View style={styles.rating}>
        <Text style={{color: 'white', fontSize: 11, fontWeight: '500'}}>
          {product.rating?.toFixed(1)}{' '}
          <Ionicons name="star" size={8} color="white" />
        </Text>
      </View>
      {/* Add other product details */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  product: {
    // flex: 1,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 0,
    padding: 10,
    width: '50%',
  },
  productName: {
    width: '100%',
    fontSize: 10,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#686868',
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  productMrp: {
    fontSize: 10,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountPercentage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  rating: {
    width: 42,
    backgroundColor: 'green',
    // paddingHorizontal : 6,
    paddingLeft: 8,
    paddingVertical: 2,
    borderRadius: 20,
    textAlign: 'center',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Product;
