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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

const MainScreen = () => {
  const [value, setValue] = useState('');
  const [updateTodo, setUpdateTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isKeyboardAvoidingEnabled, setIsKeyboardAvoidingEnabled] =
    useState(true);

  const todoContext = useContext(TodoContext);
  const todoList = todoContext.todoList;

  useEffect(() => {
    async function getList() {
      setError(null);
      setIsLoading(true);
      try {
        const todoListData = await getTodoList();
        todoContext.setTodoList(todoListData);
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
                style={styles.textInput}
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>ADD TODO</Text>
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
              style={[
                styles.addButton,
                !value && {backgroundColor: constantColors.disable},
              ]}
              onPress={addOrUpdateTodo}
              disabled={!value}>
              <Icon name="check" size={30} color={constantColors.white} />
            </TouchableOpacity>
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
    backgroundColor: constantColors.backgroundColor,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  todoContainer: {
    flex: 10,
  },
  addTodoContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('15%'),
    backgroundColor: constantColors.check,
    shadowColor: constantColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: constantColors.disable,
  },
  textInput: {
    borderRadius: wp('1%'),
    padding: wp('3%'),
    marginVertical: hp('2%'),
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
});
