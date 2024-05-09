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
            data?.checked && {backgroundColor: '#A91D3A'},
          ]}
        />
      </TouchableOpacity>

      <View style={styles.itemTextContainer}>
        <Text>{data.text}</Text>
      </View>

      <TouchableOpacity onPress={updateTodo}>
        <View style={[styles.actionIcon, {backgroundColor: '#AD88C6'}]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteTodo}>
        <View style={styles.actionIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  itemTextContainer: {
    flex: 1,
    marginRight: 5,
  },
  todoCheck: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#A91D3A',
    borderRadius: 25,
    marginRight: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C73659',
    marginLeft: 5,
    borderRadius: 3,
  },
});
