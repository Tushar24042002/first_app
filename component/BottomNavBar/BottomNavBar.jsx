import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 
const BottomNavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('home',  {headerTitle : "Home", id: 0 })} style={styles.button}>
        <Ionicons name="home" size={24} color="black" />
        <Text style={{fontSize : 10, color : "grey"}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('products', { headerTitle: 'Products' , type :"", category :"" })} style={styles.button}>
        <Ionicons name="grid-outline" size={24} color="black" />
        <Text style={{fontSize : 10, color : "grey"}}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('category', {headerTitle :"Category"})} style={styles.button}>
        <MaterialIcons name="category" size={24} color="black" />
        <Text style={{fontSize : 10, color : "grey"}}>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('paymentsuccess' , { headerTitle: 'My Orders' })} style={styles.button}>
        <Ionicons name="cube" size={24} color="black" />
        <Text style={{fontSize : 10, color : "grey"}}>My Orders</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomNavBar;
