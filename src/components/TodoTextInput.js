import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const TodoTextInput = ({onChangeText, value, disabled}) => {
  return (
    <TextInput
      placeholder="Add ToDO"
      style={styles.textInput}
      multiline
      onChangeText={onChangeText}
      autoCapitalize="none"
      value={value}
      disabled={disabled}
    />
  );
};

export default TodoTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    flex: 5,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
