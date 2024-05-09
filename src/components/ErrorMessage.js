import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ErrorMessage = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
  },
});
