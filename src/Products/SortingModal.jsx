import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
// import { Entypo } from "@expo/vector-icons";
import Entypo from 'react-native-vector-icons/Entypo';
import RadioButton from "../../component/Inputs/RadioButton";
import { TouchableWithoutFeedback } from "react-native";
const SortingModal = ({ isVisible, setIsVisible, products, setProducts }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
  };
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const sortByAZ = () => {
    const sortedArray = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProducts(sortedArray);
    toggleModal();
  };

  const sortByZA = () => {
    const sortedArray = [...products].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setProducts(sortedArray);
    toggleModal();
  };

  const sortByPriceLowToHigh = () => {
    const sortedArray = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedArray);
    toggleModal();
  };

  const sortByPriceHighToLow = () => {
    const sortedArray = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedArray);
    toggleModal();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsVisible(!isVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.heading}>
                <Text style={styles.headingText}>Sorting</Text>
                <Entypo
                  name="cross"
                  size={24}
                  color="black"
                  onPress={() => setIsVisible(!isVisible)}
                />
              </View>
              <TouchableOpacity onPress={sortByAZ}>
                <Text>A-Z</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={sortByZA}>
                <Text>Z-A</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={sortByPriceLowToHigh}>
                <Text>Price Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={sortByPriceHighToLow}>
                <Text>Price High to Low</Text>
              </TouchableOpacity>
              <RadioButton
                options={options}
                selectedOption={selectedOption}
                onSelect={handleSelect}
              />
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
    height: "50%",
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

export default SortingModal;
