// AdminProducts.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductComponent from './ProductComponent';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { allproducts } from '../../Redux/action/productAction';

const AdminProducts = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const data = useSelector(state => state);

  useEffect(() => {
    if (data.products?.products?.length === 0) {
      fetchAllProducts();
    }
    else{
      setProducts(data?.products?.products);
    }
  }, []);


  const fetchAllProducts = async () => {
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

 

  const handleEdit = (productId) => {
  };
console.log(products)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("addProduct")}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductComponent product={item} onEdit={handleEdit} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminProducts;
