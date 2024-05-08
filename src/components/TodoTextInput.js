import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const TodoTextInput = ({value, setValue}) => {
  return (
    <TextInput
      placeholder="Add ToDO"
      style={styles.textInput}
      multiline
      numberOfLines={4}
      maxLength={40}
      onChangeText={text => setValue(text)}
      value={value}
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
