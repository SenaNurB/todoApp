import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import constantColors from '../constants/Color';

const NoData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ADD TODO</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: constantColors.disable,
  },
});
