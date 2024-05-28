import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddImage = ({ selectedImage, setSelectedImage, handleLoginModal }) => {


  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const imageFromCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    console.log(result.assets[0]);
    setSelectedImage(result?.assets[0]);

  };

  const imageFromGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    console.log(result.assets[0]);
    setSelectedImage(result?.assets[0]);

  };

  return (
    <View style={styles.container}>
      {Object.keys(selectedImage).length != 0 && (
        <Image source={selectedImage} style={styles.image} />
      )}
      {Object.keys(selectedImage).length == 0 ?

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={imageFromCamera} style={styles.button}>
            <Text style={styles.buttonText}>Capture Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={imageFromGallery} style={styles.button}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
        </View> : <TouchableOpacity onPress={handleLoginModal} style={[styles.button, { marginTop: 10 }]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: "50%",
    borderRadius: 5,
    textAlign: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: '#ccc',
    gap: 10,
  }
});

export default AddImage;
