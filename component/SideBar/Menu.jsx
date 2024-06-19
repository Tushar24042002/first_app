import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state);

  return (
    <View style={menuStyles.container}>
      <ScrollView contentContainerStyle={menuStyles.scrollView}>
        <View style={menuStyles.profileContainer}>
          {user && user?.loginData?.success ? (
            <>
              <Image
                source={{ uri: 'https://example.com/user-profile-image.jpg' }}
                style={menuStyles.profileImage}
              />
              <Text style={menuStyles.profileName}>User Name</Text>
            </>
          ) : (
            <Image
              source={{ uri: 'https://example.com/default-avatar.jpg' }}
              style={menuStyles.profileImage}
            />
          )}
        </View>
        
        {/* Menu items */}
        <View style={menuStyles.menuItems}>
          {user?.loginData?.role === "ADMIN" ? (
            <>
              <TouchableOpacity style={menuStyles.menuItem} onPress={() =>
                navigation.navigate('admindashboard', {
                  headerTitle: 'Admin Dashboard',
                })
              }>
                <Text style={menuStyles.itemText}>Admin Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={menuStyles.menuItem} onPress={() => alert('Menu Item 2 pressed')}>
                <Text style={menuStyles.itemText}>Menu Item 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={menuStyles.menuItem} onPress={() => alert('Menu Item 3 pressed')}>
                <Text style={menuStyles.itemText}>Menu Item 3</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={menuStyles.menuItem}>
              <Button
                title="Login"
                onPress={() =>
                  navigation.navigate('home', { headerTitle: 'Home', id: 1 })
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Logout button */}
      <TouchableOpacity style={menuStyles.logoutButton}>
        <Text style={menuStyles.logoutText}>Logout</Text>
        {/* Add icon component here */}
        {/* For example: <Icon name="logout" size={20} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60, // Adjust to leave space for logout button
  },
  scrollView: {
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: 'grey',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop: 10,
  },
  menuItems: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
        cursor : "pointer"
  },
  menuItem: {
    paddingHorizontal: 15,
    paddingVertical : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    cursor : "pointer"
  },
  itemText: {
    fontSize: 14,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor : "#ab0c26",
    width : "100%",
    paddingHorizontal : 15,
    paddingVertical : 12
  },
  logoutText: {
    fontSize: 16,
    fontWeight : "600",
    marginRight: 10,
    color: 'white',
  },
});

export default Menu;
