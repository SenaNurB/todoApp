import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

const CancelButton = ({cancelFunc}) => {
  return (
    <TouchableOpacity onPress={cancelFunc} style={styles.button}>
      <Icon name="x" size={30} color={constantColors.white} />
    </TouchableOpacity>
  );
};

export default CancelButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1%'),
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('10%'),
    backgroundColor: constantColors.deleteBackground,
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
