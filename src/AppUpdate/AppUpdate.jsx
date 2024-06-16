import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {downloadApk, fetchAppUpdate} from './AppUpdateAction';
import DeviceInfo from 'react-native-device-info';

const AppUpdate = ({isModalVisible, setIsModalVisible}) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    fetchAppUpdate().then(res => {
      if (res?.success) {
        let data = res?.update;
        setIsModalVisible(data?.version != DeviceInfo.getVersion());
        setUrl(data?.update_url);
      }
    });
  }, []);
  const handleInstall = () => {
    downloadApk(url, setIsModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => {
          // handle back button press on Android
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Available</Text>
            <Text style={styles.modalText}>
              A new version of the app is available. Please update to continue.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleInstall}>
              <Text style={styles.buttonText}>Install Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppUpdate;
