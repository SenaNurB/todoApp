import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {TodoContext} from '../context/todoContext';
import {updateTodoFunc} from '../service/api';

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
            data?.checked && {backgroundColor: 'green'},
          ]}></View>
      </TouchableOpacity>

      <View style={styles.itemTextContainer}>
        <Text>{data.text}</Text>
      </View>

      <TouchableOpacity onPress={updateTodo}>
        <View style={[styles.actionIcon, {backgroundColor: 'green'}]}></View>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteTodo}>
        <View style={styles.actionIcon}></View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 5,
  },
  todoCheck: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
});
