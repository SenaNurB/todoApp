import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import constantColors from '../constants/Color';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={constantColors.deleteBackground} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
