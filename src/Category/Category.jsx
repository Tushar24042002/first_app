import React, {useContext, useEffect, useState} from 'react';
import {fetchSubCategory, getCategory, getSubCategory} from './CategoryAction';
import TextComponent from '../../component/Text/TextComponent';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useAppContext} from '../../component/Contexts/Context';

const Category = () => {
  const {
    productCategory,
    setProductCategory,
    setProductSubCategory,
    productSubCategory,
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState({});

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = subcategory => {
    setSelectedSubcategory(subcategory);
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
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          {productCategory &&
            productCategory.map(category => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryClick(category)}
                style={styles.categoryItem}>
                <Image
                  source={{uri: category.image}}
                  style={styles.categoryImage}
                />
                <TextComponent>{category.type_name}</TextComponent>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.subCategoryContainer}>
          {productSubCategory &&
            productSubCategory.map(subcategory => (
              <TextComponent
                key={subcategory?.id}
                onClick={() => handleSubcategoryClick(subcategory)}
                style={styles.subcategoryText}>
                {subcategory?.category_name}
              </TextComponent>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryContainer: {
    flex: 1,
    width: '33%',
    padding: 10,
  },
  subCategoryContainer: {
    flex: 2,
    padding: 10,
  },
  categoryText: {
    marginBottom: 10,
  },
  subcategoryText: {
    marginBottom: 10,
  },
  categoryItem: {
    marginBottom: 10,
    marginRight: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default Category;
