import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

const Menu = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state)=>state);
  console.log(user, "dsfsgfdg")
  return (
    <View style={menuStyles.container}>
      <View style={menuStyles.profileContainer}>
        {user && user?.loginData?.success ? (
          <>
            <Image
              source={{uri: 'https://example.com/user-profile-image.jpg'}}
              style={menuStyles.profileImage}
            />
            <Text style={menuStyles.profileName}>User Name</Text>
          </>
        ) : (
          <Image
            source={{uri: 'https://example.com/default-avatar.jpg'}}
            style={menuStyles.profileImage}
          />
        )}
      </View>
      {user?.loginData?.role === "ADMIN" ? (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('admindashboard', {
                headerTitle: 'Admin Dashboard',
              })
            }>
            <Text style={menuStyles.item}>Admin Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={menuStyles.item}>Menu Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Menu Item 3 pressed')}>
            <Text style={menuStyles.item}>Menu Item 3</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity>
          <Button
            title="Login"
            style={menuStyles.loginButton}
            onPress={() =>
              navigation.navigate('home', {headerTitle: 'Home', id: 1})
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
  loginButton: {
    fontSize: 18,
    color: 'blue',
  },
});

export default Menu;
