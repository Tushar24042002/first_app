// import React, { useContext, useEffect } from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAppContext} from '../Contexts/Context';
// import { getCart, getWishList } from '../../src/Cart/CartAction';

// const Header = ({navigation, title, isHomePage}) => {
//   const { cart, setCart, wishlistData, setWishlistData, setIsMenuOpen} =
//   useAppContext();

//   const renderLeftIcon = () => {
//     if (isHomePage) {
//       return (
//         <TouchableOpacity onPress={()=>setIsMenuOpen(true)}>
//           <Ionicons name="person" size={24} color="black" />
//         </TouchableOpacity>
//       );
//     } else {
//       return (
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="grey" />
//         </TouchableOpacity>
//       );
//     }
//   };

//   const renderRightIcons = () => {
//     return (
//       <View style={styles.rightIconsContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('cart')}>
//           <Ionicons name="cart" size={24} color="green" />
//           {cart && cart.length > 0 && (
//             <View style={styles.badgeContainer}>
//               <Text style={styles.badgeText}>{cart.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('wishlist')}>
//           <Ionicons name="heart" size={24} color="red" />
//           {wishlistData && wishlistData.length > 0 && (
//             <View style={styles.badgeContainer}>
//               <Text style={styles.badgeText}>{wishlistData.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const showTitle = title => {
//     return title?.length > 20 ? `${title.substring(0, 20)}...` : title;
//   };


//   useEffect(() => {
//     getCart(setCart);
//     getWishList(setWishlistData);
//   }, []);



//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <View>{renderLeftIcon()}</View>
//         {!isHomePage && <Text style={styles.title}>{showTitle(title)}</Text>}
//       </View>
//       <View style={styles.rightContainer}>{renderRightIcons()}</View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rightIconsContainer: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   badgeContainer: {
//     position: 'absolute',
//     right: -10,
//     top: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default Header;





// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAppContext } from '../Contexts/Context';
// import { getCart, getWishList } from '../../src/Cart/CartAction';

// const Header = ({ navigation, title, isHomePage }) => {
//   const { cart, setCart, wishlistData, setWishlistData, setIsMenuOpen } = useAppContext();
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const renderLeftIcon = () => {
//     if (isSearchActive) {
//       return (
//         <TouchableOpacity onPress={() => setIsSearchActive(false)}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//       );
//     }
//     if (isHomePage) {
//       return (
//         <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
//           <Ionicons name="person" size={24} color="black" />
//         </TouchableOpacity>
//       );
//     } else {
//       return (
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="grey" />
//         </TouchableOpacity>
//       );
//     }
//   };

//   const renderRightIcons = () => {
//     if (isSearchActive) {
//       return null; // Hide right icons when search bar is active
//     }
//     return (
//       <View style={styles.rightIconsContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('cart')}>
//           <Ionicons name="cart" size={24} color="green" />
//           {cart && cart.length > 0 && (
//             <View style={styles.badgeContainer}>
//               <Text style={styles.badgeText}>{cart.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('wishlist')}>
//           <Ionicons name="heart" size={24} color="red" />
//           {wishlistData && wishlistData.length > 0 && (
//             <View style={styles.badgeContainer}>
//               <Text style={styles.badgeText}>{wishlistData.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setIsSearchActive(true)}>
//           <Ionicons name="search" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderSearchBar = () => {
//     return (
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>
//     );
//   };

//   const showTitle = title => {
//     return title?.length > 20 ? `${title.substring(0, 20)}...` : title;
//   };

//   useEffect(() => {
//     getCart(setCart);
//     getWishList(setWishlistData);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <View>{renderLeftIcon()}</View>
//         {!isHomePage && !isSearchActive && <Text style={styles.title}>{showTitle(title)}</Text>}
//       </View>
//       {isSearchActive ? renderSearchBar() : <View style={styles.rightContainer}>{renderRightIcons()}</View>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rightIconsContainer: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   badgeContainer: {
//     position: 'absolute',
//     right: -10,
//     top: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#e0e0e0',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default Header;


import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppContext } from '../Contexts/Context';
import { getCart, getWishList } from '../../src/Cart/CartAction';

const Header = ({ navigation, title, isHomePage }) => {
  const { cart, setCart, wishlistData, setWishlistData, setIsMenuOpen } = useAppContext();

  const renderLeftIcon = () => {
    if (isHomePage) {
      return (
        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="grey" />
        </TouchableOpacity>
      );
    }
  };

  const renderRightIcons = () => {
    return (
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <Ionicons name="cart" size={24} color="green" />
          {cart && cart.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('wishlist')}>
          <Ionicons name="heart" size={24} color="red" />
          {wishlistData && wishlistData.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{wishlistData.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const showTitle = title => {
    return title?.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  useEffect(() => {
    getCart(setCart);
    getWishList(setWishlistData);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View>{renderLeftIcon()}</View>
        {!isHomePage && <Text style={styles.title}>{showTitle(title)}</Text>}
      </View>
      <View style={styles.rightContainer}>{renderRightIcons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;
