import React, {useEffect, useState} from 'react';
import {fetchSubCategory, getCategory, getSubCategory} from './CategoryAction';
import TextComponent from '../../component/Text/TextComponent';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useAppContext} from '../../component/Contexts/Context';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();
  const {
    productCategory,
    setProductCategory,
    setProductSubCategory,
    productSubCategory,
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState({});

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = (subName, type) => {
    navigation.navigate('products', {
      headerTitle: subName,
      category: subName,
      type: type,
    });
  };

  useEffect(() => {
    if (selectedCategory != null) {
      fetchSubCategoryData(selectedCategory?.id);
    }
  }, [selectedCategory]);

  useEffect(() => {
    getCategory(setProductCategory);
  }, []);

  const fetchSubCategoryData = async e => {
    getSubCategory(setProductSubCategory, e);
  };

  useEffect(() => {
    if (productCategory && productCategory.length > 0) {
      setSelectedCategory(productCategory[0]);
    }
  }, [productCategory]);

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ScrollView style={styles.categoryContainer}>
        {productCategory &&
          productCategory.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryClick(category)}
              style={styles.categoryItem}>
              <Image
                source={{
                  uri: category.image || 'https://via.placeholder.com/80',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.type_name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.subCategoryContainer}>
        <View style={styles.subCategoryGrid}>
          {productSubCategory &&
            productSubCategory.map(subcategory => (
              <TouchableOpacity
                key={subcategory?.id}
                onPress={() =>
                  handleSubcategoryClick(
                    subcategory?.category_name,
                    selectedCategory?.type_name,
                  )
                }
                style={styles.subcategoryItem}>
                <Image
                  source={{
                    uri: subcategory.image || 'https://via.placeholder.com/80',
                  }}
                  style={styles.subcategoryImage}
                />
                <Text style={styles.subcategoryText}>
                  {subcategory?.category_name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    width: '45%',
    padding: 10,
  },
  subCategoryContainer: {
    width: '100%',
    padding: 10,
  },
  subCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  subcategoryItem: {
    width: '48%', // Ensure two items per row
    marginBottom: 15,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  subcategoryImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
    marginBottom: 10,
  },
  categoryText: {
    textAlign: 'center',
  },
  subcategoryText: {
    textAlign: 'center',
  },
});

export default Category;
