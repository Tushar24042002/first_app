import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => (
  <View style={styles.card}>
    <Image source={{uri: product?.product_images[0]}} style={styles.productImage} />
    <View style={styles.topRow}>
      <Text style={styles.discountText}>{Number(product?.mrp) || 0 - Number(product?.price)} OFF</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{product.rating} ★</Text>
      </View>
    </View>
    <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
    <View style={styles.priceRow}>
      <View style={styles.priceContainer}>
        <Text style={styles.sellingPrice}>{Number(product?.price)?.toFixed(0)}</Text>
        <Text style={styles.originalPrice}>{Number(product?.mrp)?.toFixed(0)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 140,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 10,
  },
  discountText: {
    backgroundColor: '#d4edda',
    color: '#155724',
    fontSize: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopRightRadius: 2,
    borderBottomRightRadius : 2,
    fontWeight : "bold"
  },
  ratingContainer: {
    backgroundColor: '#f39c12',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  rating: {
      fontWeight : "bold",
    fontSize: 10,
    color: '#fff',
  },
  productName: {
    fontSize: 12,
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  sellingPrice: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 10,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical : 3,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3498db',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#3498db',
    fontWeight : "bold",
    fontSize: 10,
  },
});

export default ProductCard;
