// screens/AdminDashboard.js
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../../component/Contexts/Context';
import {getDashboardData} from './DashboardAction';
import { useNavigation } from '@react-navigation/native';

function AdminDashboard() {
  const {setIsMenuOpen} = useAppContext();
  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    setIsMenuOpen(false);
    fetchData();
  }, []);

  const fetchData = () => {
    getDashboardData().then(res => {
      console.log(res);
      setDashboardData(res);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {
          dashboardData?.total_users != null &&
        <View style={[styles.card, styles.blueCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleBlue]}>
            Total Users
          </Text>
          <Text style={[styles.cardValue, styles.cardValueBlue]}>
            {dashboardData?.total_users}
          </Text>
        </View>}
        {
          dashboardData?.total_vendors != null &&
        <View style={[styles.card, styles.purpleCard]}>
          <Text style={[styles.cardTitle, styles.cardTitlePurple]}>
            Total Vendors
          </Text>
          <Text style={[styles.cardValue, styles.cardValuePurple]}>
            {dashboardData?.total_vendors}
          </Text>
        </View>
}
      </View>

      <View style={styles.row}>
        {dashboardData?.total_payments != null && (
          <View style={[styles.card, styles.greenCard]}>
            <Text style={[styles.cardTitle, styles.cardTitleGreen]}>
              Total Payments
            </Text>
            <Text style={[styles.cardValue, styles.cardValueGreen]}>
              {dashboardData?.total_payments}
            </Text>
          </View>
        )}
        {
          dashboardData?.total_products != null &&
        <TouchableOpacity onPress={()=>navigation.navigate('adminproducts')} style={[styles.card, styles.orangeCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleOrange]}>
            Total Products
          </Text>
          <Text style={[styles.cardValue, styles.cardValueOrange]}>
            {dashboardData?.total_products}
          </Text>
        </TouchableOpacity>
}
      </View>

      <View style={styles.row}>
        {dashboardData?.total_orders != null && (
          <View style={[styles.card, styles.redCard]}>
            <Text style={[styles.cardTitle, styles.cardTitleRed]}>
              Delivered Orders
            </Text>
            <Text style={[styles.cardValue, styles.cardValueRed]}>
              {' '}
              {dashboardData?.total_orders}
            </Text>
          </View>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    cursor: 'pointer',
  },
  blueCard: {
    backgroundColor: '#4169E1',
  },
  cardTitleBlue: {
    color: 'white',
  },
  cardValueBlue: {
    color: 'white',
  },
  purpleCard: {
    backgroundColor: '#6A5ACD',
  },
  cardTitlePurple: {
    color: 'white',
  },
  cardValuePurple: {
    color: 'white',
  },
  greenCard: {
    backgroundColor: '#32CD32',
  },
  cardTitleGreen: {
    color: 'white',
  },
  cardValueGreen: {
    color: 'white',
  },
  orangeCard: {
    backgroundColor: '#FFA500',
  },
  cardTitleOrange: {
    color: 'white',
  },
  cardValueOrange: {
    color: 'white',
  },
  redCard: {
    backgroundColor: '#DC143C',
  },
  cardTitleRed: {
    color: 'white',
  },
  cardValueRed: {
    color: 'white',
  },
  userList: {
    flex: 1,
    marginTop: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default AdminDashboard;
