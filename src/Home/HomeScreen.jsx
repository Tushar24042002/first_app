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
import {getCart, getWishList} from '../Cart/CartAction';
import {getCurrentUser} from '../CheckOut/CheckOutAction';
import HorizontalProducts from './HorizontalProducts';
import {userDetails} from '../Redux/action/userAction';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route}) => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const {
    productCategory,
    setProductCategory,
    setIsMenuOpen,
    setCart,
    setWishlistData,
    setUserDetails,
  } = useAppContext();
  const {id} = route.params;
  const navigation = useNavigation();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const {user, category} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim]);

  useEffect(() => {
    console.log(user?.loginData , "ttrdxiuytrg")
    if (user?.loginData != null && user?.loginData?.success === true &&  user?.loginData?.authToken != null) {
      AsyncStorage.setItem('Authorization', user?.loginData?.authToken);
    }

    if (
      category == null ||
      category?.category === null ||
      category?.category?.length === 0
    ) {
      getCategory(setProductCategory, dispatch);
    } else {
      setProductCategory(category?.category);
    }
    getCart(setCart);
    getWishList(setWishlistData);
    if (user?.user != null) {
      setUserDetails(user?.user);
    } else {
      getCurrentUser(setUserDetails, dispatch);
    }
  }, []);

  useEffect(() => {
    if (id === 1) {
      setIsLoginModal(id === 1);
      setIsMenuOpen(false);
    }
  }, [route]);

  const handleLoginModal = () => {
    setIsLoginModal(false);
    getCurrentUser(setUserDetails);
  };
  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      title={item?.type_name}
      onPress={() =>
        navigation.navigate('products', {
          headerTitle: item?.type_name,
          type: item?.type_name,
          category: '',
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

          <HorizontalProducts />

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
    backgroundColor: '#ffffff',
  },
  categoryContainer: {
    // flexGrow: 1,
    height: 100,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryItem: {
    marginRight: 10,
    marginTop: 12,
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
