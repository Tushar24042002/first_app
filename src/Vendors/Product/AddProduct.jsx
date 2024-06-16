import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {ImageModal} from './ImageModal';
import {addProductFunction} from './AddProductAction';
import RNPickerSelect from 'react-native-picker-select';
import {getCategory, getSubCategory} from '../../Category/CategoryAction';
import {useAppContext} from '../../../component/Contexts/Context';
import { useSelector } from 'react-redux';

const AddProduct = ({getProductInfo, data}) => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const {
    productCategory,
    setProductCategory,
    productSubCategory,
    setProductSubCategory,
  } = useAppContext();
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const {category} = useSelector((state) => state);
  const [productInfo, setProductInfo] = useState({
    name: '',
    images: '',
    price: '',
    rating: '',
    category: null,
    type: null,
    description: '',
    author: '',
    brand: '',
  });

  useEffect(() => {
    if (category == null || category?.category == null) {
      getCategory(setProductCategory, dispatch);
    } else {
      setProductCategory(category?.category);
    }
  }, []);

  useEffect(() => {
    if (productCategory && productCategory.length > 0) {
      let data = productCategory.map((e, index) => ({
        label: e.type_name,
        value: e.id,
      }));

      setSelectCategory(data);
    }
  }, [productCategory]);

  useEffect(() => {
    if (productSubCategory && productSubCategory.length > 0) {
      let data = productSubCategory.map((e, index) => ({
        label: e.category_name,
        value: e.id,
      }));

      setSelectSubCategory(data);
    }
  }, [productSubCategory]);

  const handleOnChange = (name, value) => {
    setProductInfo({...productInfo, [name]: value});
  };

  const handleChoosePhoto = () => {
    setIsLoginModal(true);
  };

  const handleSubmit = async () => {
    // Add your form submission logic here
    productInfo.images = images;
    addProductFunction(productInfo).then((res)=>{
      console.log(res)
    });
  };
  const handleImage = e => {
    setSelectedImage(e);
  };

  const handleLoginModal = () => {
    setIsLoginModal(false);
    setImages(e => [...e, selectedImage]);
    setSelectedImage({});
  };
  // category change
  const handleChangeCategory = e => {
    setProductInfo(prev => ({
      ...prev,
      category: e,
    }));
  };

  useEffect(() => {
    if (productInfo?.type != null) {
      getSubCategory(setProductSubCategory, productInfo?.type);
    }
  }, [productInfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('name', text)}
          value={productInfo.name}
          placeholder="Enter Product Name"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>
        {images && images.length > 0 && (
          <View style={styles.imageContainer}>
            {images.map(data => {
              return <Image source={{uri: data?.uri}} style={styles.image} />;
            })}
          </View>
        )}
        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('price', text)}
          value={productInfo.price}
          placeholder="Enter Price"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('rating', text)}
          value={productInfo.rating}
          placeholder="Enter Rating"
          keyboardType="numeric"
        />
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{label: 'Select Product Type', value: null}}
            onValueChange={value => handleOnChange('type',value)}
            useNativeAndroidPickerStyle={true}
            items={selectCategory}
            style={pickerCSS}
          />
        </View>

        {productInfo && productInfo.type != null  && (
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{label: 'Select Product Category', value: null}}
              onValueChange={value => handleOnChange('category',value)}
              useNativeAndroidPickerStyle={true}
              items={selectSubCategory}
              style={pickerCSS}
            />
          </View>
        )}

        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('description', text)}
          value={productInfo.description}
          placeholder="Enter Description"
          keyboardType="default"
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('author', text)}
          value={productInfo.author}
          placeholder="Enter Author"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => handleOnChange('brand', text)}
          value={productInfo.brand}
          placeholder="Enter Brand"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoginModal && (
        <ImageModal
          isLoginModal={isLoginModal}
          handleLoginModal={handleLoginModal}
          selectedImage={selectedImage}
          setSelectedImage={handleImage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  select: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

const pickerCSS = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default AddProduct;
