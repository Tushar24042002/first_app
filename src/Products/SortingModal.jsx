import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

const SortingModal = ({ isVisible, setIsVisible, products, setProducts }) => {
  const [selectedOption, setSelectedOption] = useState(null);

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(!isVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Sorting Options</Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Entypo
                name="cross"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.option} onPress={sortByAZ}>
            <Text style={styles.optionText}>A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={sortByZA}>
            <Text style={styles.optionText}>Z-A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={sortByPriceLowToHigh}>
            <Text style={styles.optionText}>Price Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={sortByPriceHighToLow}>
            <Text style={styles.optionText}>Price High to Low</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  option: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
});

export default SortingModal;
