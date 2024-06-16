import React, {useEffect, useRef, useState} from 'react';
import ImageCarousel from './ImageCarousel';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';
import BottomModal from '../../component/Modal/BottomModal';
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
import {productDetails} from './ProductDetailsAction';
import {addCart, getCart} from '../Cart/CartAction';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../component/Contexts/Context';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const {width} = Dimensions.get('window');

const ProductDetail = ({route}) => {
  const {id} = route.params;
  const {setCart} = useAppContext();
  const [descModal, setDescModal] = useState(false);
  const descriptionRef = useRef(null);
  const [product, setProduct] = useState({});
  const navigation = useNavigation();
  const handleOpenDescModal = () => {
    setDescModal(true);
  };

  const handleCloseDescModal = () => {
    setDescModal(false);
  };

  useEffect(() => {
    productDetails(id)
      .then(res => {
        setProduct(res?.product);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = productId => {
    let obj = {
      product_id: productId,
      quantity: 1,
    };
    addCart(obj, navigation)
      .then(res => {
        if (res?.success) {
          getCart(setCart);
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
      })
      .catch(err => {
        console.log(err);
      });
  };
  const discountPercentage = (((product?.mrp || 0) - product.price) / (product?.mrp || 1)) * 100;
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageCarousel images={product?.product_images} />
        <Text style={styles.productName}>{product?.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            <FontAwesome name="rupee" size={18} color="black" />
            {product?.price}
          </Text>
          <Text style={styles.productMrp}>
            <FontAwesome name="rupee" size={18} color="gray" />
            {product?.mrp || 0}
          </Text>
          <Text style={styles.discountPercentage}>
            {discountPercentage.toFixed(2)}% OFF
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>
            {1?.toFixed(1)} <Ionicons name="star" size={12} color="white" />
          </Text>
        </View>
        <Text style={styles.title}>Description</Text>
        <Text
          ref={descriptionRef}
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.description}>
          {product?.description}
        </Text>
        <Text>Type - {product?.product_type?.name}</Text>
        <Text>Category - {product?.product_category?.name}</Text>
        {product?.description?.length > 60 && (
          <TouchableOpacity onPress={handleOpenDescModal}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        )}
        <BottomModal
          title={'Description'}
          isVisible={descModal}
          onClose={handleCloseDescModal}>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              textAlign: 'justify',
            }}>
            {product?.description}
          </Text>
        </BottomModal>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(product?.id)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
    marginBottom: 10,
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
  productName: {
    width: '100%',
    fontSize: 15,
    textTransform: 'capitalize',
    fontWeight: '600',
    marginBottom: 0,
    color: '#686868',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  productMrp: {
    fontSize: 15,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountPercentage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    fontSize: 12,
    paddingHorizontal : 10,
    paddingVertical : 3,
    borderRadius : 5

  },
  rating: {
    width: 56,
    backgroundColor: 'green',
    // paddingHorizontal : 6,
    paddingLeft: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom : 5
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    gap: 10,
  },
  button: {
    // flex: 1,
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 12,
    // marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
