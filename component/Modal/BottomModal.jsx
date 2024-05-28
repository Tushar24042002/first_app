import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { Entypo } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
const BottomModal = ({title, isVisible, onClose, children }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={()=>onClose()}
      >
        <TouchableWithoutFeedback onPress={()=>onClose()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.heading}>
                <Text style={styles.headingText}>{title}</Text>
                <Entypo
                  name="cross"
                  size={24}
                  color="black"
                  onPress={()=>onClose()}
                />
              </View>
            {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "#20232a7d",
  },
  modalView: {
    // margin: 20,
    bottom: 0,
    width: "100%",
    // height: "50%",
    backgroundColor: "white",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    width: "100%",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    // height :40,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BottomModal;
