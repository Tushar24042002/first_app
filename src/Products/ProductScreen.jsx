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

  useEffect(() => {
    if (data.products?.length === 0) {
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
            <View style={styles.filterContainer}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.gridButton}>
        <Ionicons name="grid" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
        <Ionicons name="menu" size={18} color="#ccc" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
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
    backgroundColor:"#fff"
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
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



  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop : 5
  },
  leftSide: {
    flexDirection: 'row',
  },
  gridButton: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 5,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,

  },
  filterButtonText: {
    color: '#000',
        fontWeight :"600"
  },
});

export default ProductScreen;
