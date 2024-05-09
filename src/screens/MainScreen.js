import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import TodoTextInput from '../components/TodoTextInput';
import {TodoContext} from '../context/todoContext';
import {getTodoList, storeTodo, updateTodoFunc} from '../service/api';

const MainScreen = () => {
  const [value, setValue] = useState('');
  const [updateTodo, setUpdateTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    async function getList() {
      const todoList = await getTodoList();

      todoContext.setTodoList(todoList);
    }

    getList();
  }, []);

  const addOrUpdateTodo = async () => {
    if (isEditing) {
      const todoItem = {
        text: value,
        date: updateTodo.date,
        checked: updateTodo.checked,
      };
      todoContext.updateTodo(updateTodo.id, todoItem);
      await updateTodoFunc(updateTodo.id, todoItem);
      setValue('');
    } else {
      const todoItem = {text: value, date: new Date(), checked: false};
      const id = await storeTodo(todoItem);
      todoContext.addTodo({...todoItem, id: id});
      setValue('');
    }
    setIsEditing(false);
  };

  const updateTodoItem = item => {
    setValue(item.text);
    setIsEditing(true);
    setUpdateTodo(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.todoContainer}>
          <Text style={styles.headerText}>TODO's</Text>

          <TodoList updateTodoItem={updateTodoItem} />
        </View>

        <View style={styles.addTodoContainer}>
          <TodoTextInput
            value={value}
            onChangeText={value => setValue(value)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addOrUpdateTodo}
            disabled={!value}></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  todoContainer: {
    flex: 10,
  },
  addTodoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
});
