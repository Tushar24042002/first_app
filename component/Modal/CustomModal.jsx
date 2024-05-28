import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CustomModal = ({ visible, onClose, position, children }) => {
  const modalStyle = position === 'bottom' ? styles.bottomView : styles.centeredView;

  return (
    <Modal
      animationType={position === 'bottom' ? "slide" : "fade"}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <View style={[modalStyle, styles.modalContent]}>
          {children}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%', // Adjust width to fit content
  },
  bottomView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%', // Adjust width to fit content
  },
  modalContent: {
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default CustomModal;
