import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {fetchProducts} from './ProductAction';
import Product from '../../component/Product/Product';
import SortingModal from './SortingModal';

const ProductScreen = ({route}) => {
  const [staticProducts, setStaticProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {type} = route.params;
  const {category} = route.params;

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [type, category]);

  const fetchDataFromAPI = async () => {
    try {
      const result = await fetchProducts(type, category);

      setProducts(result?.products);
      setStaticProducts(result?.products);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const changeImageUrl = imgArr => {
    console.log(imgArr);
    return imgArr?.map(url => url.replace('http://', 'https://'));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productContainer}>
        {products &&
          products?.map(
            (product, index) => (
              (product.product_images = changeImageUrl(product.product_images)),
              (<Product key={index} product={product} />)
            ),
          )}
        {!products && <Text>No Product Found</Text>}
      </View>

      {/* </CustomModal> */}
      <SortingModal
        setProducts={setProducts}
        products={products}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: 'column',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProductScreen;
