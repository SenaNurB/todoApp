import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

const AddOrUpdateButton = ({value, addOrUpdateTodo}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        !value && {backgroundColor: constantColors.disable},
      ]}
      onPress={addOrUpdateTodo}
      disabled={!value}>
      <Icon name="check" size={30} color={constantColors.white} />
    </TouchableOpacity>
  );
};

export default AddOrUpdateButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('10%'),
    backgroundColor: constantColors.check,
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
