// screens/AdminDashboard.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useAppContext } from '../../../component/Contexts/Context';

// Mock Data
const products = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
  { id: '3', name: 'Product 3' },
  // Add more products as needed
];

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  // Add more users as needed
];

const payments = [
  { id: '1', amount: 100, date: '2023-05-01' },
  { id: '2', amount: 150, date: '2023-05-15' },
  { id: '3', amount: 200, date: '2023-05-20' },
  // Add more payments as needed
];

const orders = [
  { id: '1', status: 'delivered' },
  { id: '2', status: 'pending' },
  { id: '3', status: 'delivered' },
  // Add more orders as needed
];

// Helper functions to calculate metrics
const getTotalPayments = () => payments.reduce((sum, payment) => sum + payment.amount, 0);
const getMonthlyPayments = (month) => payments
  .filter(payment => new Date(payment.date).getMonth() + 1 === month)
  .reduce((sum, payment) => sum + payment.amount, 0);
const getDeliveredOrdersCount = () => orders.filter(order => order.status === 'delivered').length;

function AdminDashboard() {
  const { setIsMenuOpen } = useAppContext();

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.row}>
        <View style={[styles.card, styles.blueCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleBlue]}>Total Products</Text>
          <Text style={[styles.cardValue, styles.cardValueBlue]}>{products.length}</Text>
        </View>
        <View style={[styles.card, styles.purpleCard]}>
          <Text style={[styles.cardTitle, styles.cardTitlePurple]}>Total Users</Text>
          <Text style={[styles.cardValue, styles.cardValuePurple]}>{users.length}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.greenCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleGreen]}>Total Payments</Text>
          <Text style={[styles.cardValue, styles.cardValueGreen]}>${getTotalPayments()}</Text>
        </View>
        <View style={[styles.card, styles.orangeCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleOrange]}>Monthly Payments</Text>
          <Text style={[styles.cardValue, styles.cardValueOrange]}>${getMonthlyPayments(new Date().getMonth() + 1)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.redCard]}>
          <Text style={[styles.cardTitle, styles.cardTitleRed]}>Delivered Orders</Text>
          <Text style={[styles.cardValue, styles.cardValueRed]}>{getDeliveredOrdersCount()}</Text>
        </View>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.userList}
      />
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
    cursor :"pointer"
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
