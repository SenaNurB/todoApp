import {FlatList} from 'react-native';
import React from 'react';
import ListItem from './ListItem';

const TodoList = ({updateTodoItem, data}) => {
  const renderTodoItem = itemData => {
    return (
      <ListItem
        data={itemData.item}
        updateTodo={() => {
          updateTodoItem(itemData.item);
        }}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderTodoItem}
    />
  );
};

export default TodoList;
