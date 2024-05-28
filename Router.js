// Router.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home/HomeScreen'; // Assuming you have a HomeScreen component
import ProductScreen from './src/Products/ProductScreen'; // Assuming you have a ProductScreen component
import Header from './component/Header/Header'; // Assuming you have a Header component
import BottomNavBar from './component/BottomNavBar/BottomNavBar'; // Assuming you have a Footer component
import Category from './src/Category/Category';
import MyOrders from './src/Orders/MyOrders';
import ProductDetail from './src/ProductDetails/ProductDetail';
import Cart from './src/Cart/Cart';
import AddProduct from './src/Vendors/Product/AddProduct';
import Menu from './component/SideBar/Menu';
import { useAppContext } from './component/Contexts/Context';
import SideMenu from 'react-native-side-menu';
import UserDetailsForm from './src/CheckOut/UserDetailsForm';
import Wishlist from './src/Wishlist/Wishlist';
import SearchPage from './component/Search/SearchPage';

const Stack = createStackNavigator();

const Router = ({ props }) => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();
  const menu = <Menu />;
  const [routeName, setRouteName] = useState("home");
  console.log(routeName)
  return (

      <NavigationContainer>
            <SideMenu menu={menu} isOpen={isMenuOpen} onChange={setIsMenuOpen}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: ({ navigation, route }) => (
              setRouteName(route.name),
              <Header navigation={navigation} title={route.params?.headerTitle ?? route.name} isHomePage={route.name === 'home'} />
            ),
          }}
        >
          {/* <Stack.Screen
          name="home"
          component={(props) => <HomeScreen {...props} modalProp={props.isOpen} />}
          // component={HomeScreen}
          path="home"
          initialParams={{ id:0}}
        /> */}
          <Stack.Screen
            name="home"
            options={{ title: 'Home' }}
            initialParams={{ id: 0 }}
          >
            {(props) => <HomeScreen {...props} modalProp={props.isOpen} />}
          </Stack.Screen>
          <Stack.Screen
            name="products"
            component={ProductScreen}
            initialParams={{ category: "" , type :""}}
          />
          <Stack.Screen
            name="productsDetail"
            component={ProductDetail}
          />
          <Stack.Screen
            name="category"
            component={Category}
          />
          <Stack.Screen
            name="myorders"
            component={MyOrders}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
          />
          <Stack.Screen
            name="addProduct"
            component={AddProduct}
          />
           <Stack.Screen
            name="userDetailsForm"
            component={UserDetailsForm}
          />
             <Stack.Screen
            name="wishlist"
            component={Wishlist}
          />
           <Stack.Screen 
          name="Search" 
          component={SearchPage} 
          options={{ headerShown: false }} 
        />
          
          
        </Stack.Navigator>
        {routeName != "productsDetail" &&  routeName != "cart" && routeName != "userDetailsForm" && routeName != "Search" && <BottomNavBar />}
        </SideMenu>
      </NavigationContainer>
    // </SideMenu>
  );
};

export default Router;