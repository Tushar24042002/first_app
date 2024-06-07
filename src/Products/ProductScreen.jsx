import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchProducts} from './ProductAction';
import Product from '../../component/Product/Product';
import SortingModal from './SortingModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {allproducts} from '../Redux/action/productAction';

const ProductScreen = ({route}) => {
  const navigation = useNavigation();
  const [staticProducts, setStaticProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {type} = route.params;
  const {category} = route.params;
  const dispatch = useDispatch();

  const data = useSelector(state => state);
  console.log('data', data);

  useEffect(() => {
    if (data.products?.length === 0) {
      console.log("fetching")
      fetchDataFromAPI();
    }
    else{
      setProducts(data?.products?.products);
    }
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [type, category]);

  const fetchDataFromAPI = async () => {
    try {
      const result = await fetchProducts(type, category);
      dispatch(allproducts(result?.products));
      setProducts(result?.products);
      setStaticProducts(result?.products);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const changeImageUrl = imgArr => {
    return imgArr?.map(url => url.replace('http://', 'https://'));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* </CustomModal> */}

      {products && (
        <View style={{flex: 1, width: '100%'}}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.filterButtonText}>Sorting & Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.productContainer}>
        {products &&
          products?.map(
            (product, index) => (
              (product.product_images = changeImageUrl(product.product_images)),
              (<Product key={index} product={product} />)
            ),
          )}
        {!products && (
          <View style={styles.emptyContainer}>
            <Ionicons name="product-outline" size={100} color="#ccc" />
            <Text style={styles.emptyText}>No Products</Text>
            <Button
              title="Reset Filter"
              onPress={() =>
                navigation.navigate('products', {
                  headerTitle: 'Products',
                  type: '',
                  category: '',
                })
              }
            />
          </View>
        )}
      </View>
      <SortingModal
        setProducts={setProducts}
        products={products}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      />
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
  filterButton: {
    backgroundColor: 'blue',
    padding: 6,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginVertical: 10,
  },
});

export default ProductScreen;
