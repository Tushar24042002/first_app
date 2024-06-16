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
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getWishList, removeWishlist } from '../Cart/CartAction';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const Wishlist = () => {
  const { wishlistData, setWishlistData } = useAppContext();

  const navigation = useNavigation();

  const {user} = useSelector((state)=>state);
  useEffect(() => {
    if(user?.loginData == null ||  user?.loginData?.success === undefined){
      navigation.navigate('home', { headerTitle: "Home", id: 1 })
    }

  }, []);



  const removeFromWishlist = prodId => {
    let obj = {
      product_id: prodId,
    };
    removeWishlist(obj).then((res)=>{
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

  return (
    <View style={styles.container}>
      {wishlistData === undefined || wishlistData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={100} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {wishlistData && wishlistData.map((wishlistItem, index) => (
            <View key={index} style={styles.wishlistBox}>
              <Image
                source={{ uri: wishlistItem.product_image }}
                style={styles.image}
              />
              <View style={styles.details}>
                <Text style={styles.name}>{wishlistItem.name}</Text>
                <Text style={styles.category}>{wishlistItem.category}</Text>
              </View>
              <View style={styles.priceRemove}>
                <Text style={styles.price}>
                  <FontAwesome name="rupee" size={14} color="black" />
                  {wishlistItem.price}
                </Text>
                <TouchableOpacity onPress={() => removeFromWishlist(wishlistItem?.product_id)}>
                  <Ionicons name="heart-dislike-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    paddingBottom: 60, // Add padding at the bottom
  },
  wishlistBox: {
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
  priceRemove: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Wishlist;
