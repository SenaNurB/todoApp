import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

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
    borderRadius: wp('1%'),
    flex: 5,
    marginRight: wp('2%'),
    padding: wp('6%'),
    backgroundColor: constantColors.white,
    shadowColor: constantColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
