import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
// const height = (width * 16) / 20;

const ImageCarousel = ({ images, isThumbnailShow = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: activeIndex * width });
  }, [activeIndex]);

  const handleThumbnailPress = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(newIndex);
        }}
      >
        {images && images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image?.replace("http://", "https://") }}
            style={{ width, height :220, objectFit: "cover", borderRadius : 10, overflow :"hidden" }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    {
      isThumbnailShow && 
     <ScrollView horizontal style={styles.thumbnailContainer}>
        {images &&  images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.thumbnail, images.length - 1 === index ? styles.lastThumbnail :""]}
            onPress={() => handleThumbnailPress(index)}
          >
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 80, objectFit: "cover" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width : "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnailContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: "100%",
    flexDirection: "row",
  },
  thumbnail: {
    borderWidth :1,
    borderRadius :10,
    overflow :"hidden",
    borderColor :"black",
    marginRight: 5.5,
    width: width * 0.23, // Each thumbnail takes 25% of the screen width
  },
  lastThumbnail :{
    marginRight : 0
  }
});

export default ImageCarousel;
