// components/AdminDashboard.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchDashboardData } from '../actions/dashboardActions';

const AdminDashboard = ({ fetchDashboardData, dashboard }) => {
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (dashboard.loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (dashboard.error) {
    return <Text>Error: {dashboard.error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total Products:</Text>
        <Text style={styles.value}>{dashboard.totalProducts}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Earnings:</Text>
        <Text style={styles.value}>${dashboard.totalEarnings}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Orders:</Text>
        <Text style={styles.value}>{dashboard.totalOrders}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = {
  fetchDashboardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
