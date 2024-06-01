// Router.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import { checkLogin, loginStatus } from './src/Home/Login/LoginAction';
import AuthNavigation from './component/Auth/AuthNavigation';
import AdminDashboard from './src/Vendors/Dashboard/AdminDashboard';
import PaymentSuccess from './src/Payment/PaymentSuccess';

const Stack = createStackNavigator();

const Router = ({ props }) => {

  const { isMenuOpen, setIsMenuOpen } = useAppContext();
  const menu = <Menu />;
  const [routeName, setRouteName] = useState("home");


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
            initialParams={{ category: "", type: "" }}
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
          >
            {(props) => <AuthNavigation   {...props} component={MyOrders} />}
          </Stack.Screen>
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


{/* payment */}

<Stack.Screen
            name="paymentsuccess"
          >
            {(props) => <AuthNavigation   {...props} component={PaymentSuccess} />}
          </Stack.Screen>

          {/* admin dashboard */}
          <Stack.Screen
            name="admindashboard"
          >
            {(props) => <AuthNavigation   {...props} component={AdminDashboard} />}
          </Stack.Screen>

        </Stack.Navigator>
        {routeName != "productsDetail" && routeName != "cart" && routeName != "userDetailsForm" && routeName != "Search" && routeName != "paymentsuccess" &&<BottomNavBar />}
      </SideMenu>
    </NavigationContainer>
    // </SideMenu>
  );
};

export default Router;
