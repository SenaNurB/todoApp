import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import constantColors from '../constants/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchInput = ({
  handleSearch,
  searchText,
  setIsKeyboardAvoidingEnabled,
}) => {
  return (
    <TextInput
      placeholder="Search"
      style={styles.textInput}
      clearButtonMode="always"
      value={searchText}
      onChangeText={text => handleSearch(text)}
      onFocus={() => setIsKeyboardAvoidingEnabled(false)}
      onBlur={() => setIsKeyboardAvoidingEnabled(true)}
    />
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: wp('1%'),
    padding: wp('3%'),
    marginVertical: hp('2%'),
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
