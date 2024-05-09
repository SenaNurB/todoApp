import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const TodoTextInput = ({onChangeText, value, disabled}) => {
  return (
    <TextInput
      placeholder="Add ToDO"
      style={styles.textInput}
      multiline
      onChangeText={onChangeText}
      value={value}
      disabled={disabled}
    />
  );
};

export default TodoTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 5,
    marginRight: 10,
    padding: 20,
  },
});
