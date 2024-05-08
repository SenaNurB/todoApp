import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import TodoList from '../components/TodoList';
import TodoTextInput from '../components/TodoTextInput';
import {TodoContext} from '../context/todoContext';

const MainScreen = () => {
  const [value, setValue] = useState('');
  const [todoId, setTodoId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const todoContext = useContext(TodoContext);

  const addTodo = () => {
    if (isEditing) {
      todoContext.updateTodo(todoId, {text: value});
      setValue('');
    } else {
      todoContext.addTodo({text: value, date: new Date()});
      setValue('');
    }
    setIsEditing(false);
  };

  const updateTodoItem = item => {
    setValue(item.item.text);
    setIsEditing(true);
    setTodoId(item.item.id);
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
          <TodoTextInput value={value} setValue={setValue} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTodo}></TouchableOpacity>
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
