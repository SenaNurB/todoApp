import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ListItem from './ListItem';

const TodoList = ({data}) => {
  const renderTodoItem = itemData => {
    return <ListItem data={itemData.item} />;
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

const styles = StyleSheet.create({});
