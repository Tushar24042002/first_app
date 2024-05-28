import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';

const MyImage = ({ source, style }) => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <View style={[styles.container, style]}>
      {isLoading && <ActivityIndicator style={styles.loader} size="large" color="blue" />}
      <Image
        source={source}
        style={[styles.image, isLoading && styles.hidden]}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
});

export default MyImage;
