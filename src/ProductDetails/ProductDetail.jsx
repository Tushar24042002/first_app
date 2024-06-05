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
import {addCart} from '../Cart/CartAction';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const ProductDetail = ({route}) => {
  const {id} = route.params;

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
        console.log('working', res.product);
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageCarousel images={product?.product_images} />
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.productPrice}>
          {' '}
          <FontAwesome name="rupee" size={18} color="black" />
          {product?.price}
        </Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'justify',
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
  productName: {
    width: '100%',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '600',
    marginBottom: 0,
    color: '#686868',
  },
  productPrice: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    marginBottom: 4,
  },
  rating: {
    width: 56,
    backgroundColor: 'green',
    // paddingHorizontal : 6,
    paddingLeft: 10,
    paddingVertical: 4,
    borderRadius: 20,
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
