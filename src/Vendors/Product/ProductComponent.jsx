// ProductComponent.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductComponent = ({ product, onEdit }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product?.product_images && product?.product_images[0] }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.type}>{product?.product_type?.name}</Text>
        <Text style={styles.subType}>{product?.product_category?.name}</Text>
      </View>
      <TouchableOpacity onPress={() => onEdit(product.id)} style={styles.editIcon}>
        <Ionicons name="pencil" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#888',
  },
  subType: {
    fontSize: 14,
    color: '#888',
  },
  editIcon: {
    padding: 5,
  },
});

export default ProductComponent;
