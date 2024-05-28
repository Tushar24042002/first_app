import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import LoginModal from './Login/LoginModal';
import {checkLogin} from './Login/LoginAction';
import {fetchCategory, getCategory} from '../Category/CategoryAction';
import {shortLength} from '../Constants/Utils';
import {useNavigation} from '@react-navigation/native';
import ImageCarousel from '../ProductDetails/ImageCarousel';
import {useAppContext} from '../../component/Contexts/Context';
import { getCart, getWishList } from '../Cart/CartAction';

const HomeScreen = ({route}) => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const {productCategory, setProductCategory, setIsMenuOpen , setCart, setWishlistData} = useAppContext();
  const {id} = route.params;
  const navigation = useNavigation();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true, // Using native driver for better performance
    }).start();
  }, [bounceAnim]);

  useEffect(() => {
    getCategory(setProductCategory);
    getCart(setCart);
    getWishList(setWishlistData);
    // checkLogin();
  }, []);

  useEffect(() => {
    console.log(id);
    if (id === 1) {
      setIsLoginModal(id === 1);
      setIsMenuOpen(false);
    }
  }, [route]);

  const handleLoginModal = () => {
        setIsLoginModal(false);
  };
  console.log(isLoginModal);
  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      title={item?.type_name}
      onPress={() =>
        navigation.navigate('products', {
          headerTitle: item?.type_name,
          type: item?.type_name,
          category :""
        })
      }>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item?.image?.replace('http://', 'https://')}}
          style={styles.categoryImage}
        />
      </View>
      <Text style={styles.categoryName}>{shortLength(item.type_name, 10)}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={{transform: [{scale: bounceAnim}]}}>
      <View style={styles.container}>
        <ScrollView>
          <ImageCarousel
            images={[
              'https://res.cloudinary.com/dxguqzge7/image/upload/v1682838911/Shoe_e2yc1d.jpg',
              'https://res.cloudinary.com/dxguqzge7/image/upload/v1682838761/Book_lc6ikb.jpg',
            ]}
            isThumbnailShow={false}
          />

          <FlatList
            data={productCategory}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={styles.categoryContainer}
          />
          {isLoginModal && (
            <LoginModal
              isLoginModal={isLoginModal}
              handleLoginModal={handleLoginModal}
            />
          )}
        </ScrollView>
      </View>
    </Animated.View>
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
  categoryContainer: {
    // flexGrow: 1,
    height: 80,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
    marginBottom: 3,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomeScreen;