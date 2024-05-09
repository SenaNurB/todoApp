import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {TodoContext} from '../context/todoContext';
import {updateTodoFunc} from '../service/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

const ListItem = ({data, deleteTodo, updateTodo}) => {
  const todoContext = useContext(TodoContext);

  const checkedFunc = async () => {
    const todoItem = {
      text: data.text,
      date: data.date,
      checked: !data.checked,
    };
    todoContext.updateTodo(data.id, {checked: !data.checked});
    await updateTodoFunc(data.id, todoItem);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          checkedFunc();
        }}>
        <View
          style={[
            styles.todoCheck,
            data?.checked && {backgroundColor: constantColors.check},
          ]}>
          <Icon name="check" size={20} color={constantColors.white} />
        </View>
      </TouchableOpacity>

      <View style={styles.itemTextContainer}>
        <Text
          style={[
            styles.text,
            data?.checked && {
              color: constantColors.disable,
              textDecorationLine: 'line-through',
            },
          ]}>
          {data.text}
        </Text>
      </View>

      <TouchableOpacity onPress={updateTodo}>
        <View
          style={[
            styles.actionIcon,
            {backgroundColor: constantColors.editBackground},
          ]}>
          <Icon name="edit" size={20} color={constantColors.white} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteTodo}>
        <View style={styles.actionIcon}>
          <Icon name="delete" size={20} color={constantColors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: wp('4%'),
    flexDirection: 'row',
    borderRadius: wp('1%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'space-between',
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
  itemTextContainer: {
    flex: 1,
    marginRight: wp('1%'),
  },
  todoCheck: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('6%'),
    height: wp('6%'),
    borderWidth: 1,
    borderColor: constantColors.check,
    borderRadius: wp('6%'),
    marginRight: wp('2%'),
  },
  actionIcon: {
    height: wp('7%'),
    width: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constantColors.deleteBackground,
    marginLeft: wp('1%'),
    borderRadius: wp('1%'),
  },
  text: {},
});
