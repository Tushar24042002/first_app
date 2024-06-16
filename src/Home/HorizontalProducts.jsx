import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProductCard from '../../component/Product/ProductCard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { allproducts } from '../Redux/action/productAction';
import { fetchProducts } from '../Products/ProductAction';
import { useNavigation } from '@react-navigation/native';



const HorizontalProducts = () => {
  const navigation = useNavigation();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const data = useSelector(state => state);
  
    useEffect(() => {
      if (data.products?.products?.length === 0) {
        fetchDataFromAPI();
      }
      else{
        setProducts(data?.products?.products);
      }
    }, []);
  
  
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchProducts("", "");
        dispatch(allproducts(result?.products));
        setProducts(result?.products);
        setStaticProducts(result?.products);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Special Deals</Text>
        <TouchableOpacity style={styles.headerButton} onPress={()=> navigation.navigate('products', { headerTitle: 'Products' , type :"", category :"" })}>
          <Text style={styles.headerButtonText}>See All</Text>
          <Ionicons name="arrow-forward" size={16} color="#DC143C" />
        </TouchableOpacity>
        </View>
      <FlatList
        data={products}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    color :"#DC143C"
  },
  list: {
    paddingVertical: 10,
  },
});

export default HorizontalProducts;
