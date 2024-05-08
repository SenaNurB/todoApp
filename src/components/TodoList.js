import {FlatList, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import ListItem from './ListItem';
import {TodoContext} from '../context/todoContext';

const TodoList = ({updateTodoItem}) => {
  const todoContext = useContext(TodoContext);

  const updateTodo = itemData => {
    updateTodoItem(itemData);
  };

  const renderTodoItem = itemData => {
    return (
      <ListItem
        data={itemData.item}
        deleteTodo={() => {
          todoContext.deleteTodo(itemData.item.id);
        }}
        updateTodo={() => {
          updateTodo(itemData);
        }}
      />
    );
  };

  return (
    <FlatList
      data={todoContext.todoList}
      keyExtractor={item => item.id}
      renderItem={renderTodoItem}
    />
  );
};

export default TodoList;

const styles = StyleSheet.create({});
