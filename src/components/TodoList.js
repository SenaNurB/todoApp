import {FlatList} from 'react-native';
import React, {useContext} from 'react';
import ListItem from './ListItem';
import {TodoContext} from '../context/todoContext';
import {deleteTodo} from '../service/api';

const TodoList = ({updateTodoItem}) => {
  const todoContext = useContext(TodoContext);

  const deleteTodoItem = async id => {
    await deleteTodo(id);
    todoContext.deleteTodo(id);
  };

  const renderTodoItem = itemData => {
    return (
      <ListItem
        data={itemData.item}
        deleteTodo={() => {
          deleteTodoItem(itemData.item.id);
        }}
        updateTodo={() => {
          updateTodoItem(itemData);
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
