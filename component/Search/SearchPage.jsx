import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSearchResult} from './SearchAction';

const SearchPage = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery != '') {
      handleSearchResult(searchQuery);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery]);
  const handleSearchResult = e => {
    getSearchResult(e).then(res => {
      setFilteredItems(res);
    });
  };

  const handleSearchClick = (id, content, name, type) => {
    console.log(content, id);
    if (content === 'type') {
      navigation.navigate('products', {
        headerTitle: name,
        category: "",
        type : name
      });
    }
    else if (content === 'category') {
        navigation.navigate('products', {
          headerTitle: name,
          category: name,
          type :type
        });
      }
      else if (content === 'product') {
        navigation.navigate('productsDetail', {
          headerTitle: name,
          id: id,
        });
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            key={item.id}
            onPress={() => handleSearchClick(item.id, item.content, item.name, item.type)}>
            <Ionicons
              name={'search'}
              size={20}
              color="grey"
              style={styles.itemIcon}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#262525',
  },
});

export default SearchPage;
