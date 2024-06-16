// AdminProducts.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductComponent from './ProductComponent';
import { useNavigation } from '@react-navigation/native';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
        type: 'Type 1',
        subType: 'Subtype 1',
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/150',
        type: 'Type 2',
        subType: 'Subtype 2',
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'https://via.placeholder.com/150',
        type: 'Type 3',
        subType: 'Subtype 3',
      },
    ];

    setProducts(mockProducts);
  };

  const handleEdit = (productId) => {
  };

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
