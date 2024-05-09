import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import TodoTextInput from '../components/TodoTextInput';
import {TodoContext} from '../context/todoContext';
import {getTodoList, storeTodo, updateTodoFunc} from '../service/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MainScreen = () => {
  const [value, setValue] = useState('');
  const [updateTodo, setUpdateTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const todoContext = useContext(TodoContext);
  const [isKeyboardAvoidingEnabled, setIsKeyboardAvoidingEnabled] =
    useState(true);
  const todoList = todoContext.todoList;

  useEffect(() => {
    async function getList() {
      setError(null);
      setIsLoading(true);
      try {
        const todoList = await getTodoList();
        todoContext.setTodoList(todoList);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    }

    getList();
  }, []);

  if (error && !isLoading) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const addOrUpdateTodo = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const updateTodoItem = item => {
    setValue(item.text);
    setIsEditing(true);
    setUpdateTodo(item);
  };

  const handleSearch = text => {
    setSearchText(text);
    const filteredTodoList = todoList.filter(todo =>
      todo.text.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredTodoList(filteredTodoList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={isKeyboardAvoidingEnabled ? 'padding' : undefined}>
        <View style={styles.todoContainer}>
          <Text style={styles.headerText}>TODO's</Text>

          {todoList?.length > 0 ? (
            <>
              <TextInput
                placeholder="Search"
                clearButtonMode="always"
                value={searchText}
                onChangeText={text => handleSearch(text)}
                onFocus={() => setIsKeyboardAvoidingEnabled(false)}
                onBlur={() => setIsKeyboardAvoidingEnabled(true)}
              />

              <TodoList
                updateTodoItem={updateTodoItem}
                data={searchText ? filteredTodoList : todoList}
              />
            </>
          ) : (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{fontSize: 18, color: 'gray'}}>ADD TODO</Text>
            </View>
          )}
        </View>

        {isKeyboardAvoidingEnabled && (
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
        )}
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
