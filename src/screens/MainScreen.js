import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  TodoList,
  TodoTextInput,
  AddOrUpdateButton,
  SearchInput,
  NoData,
  ErrorMessage,
  LoadingSpinner,
  CancelButton,
} from '../components';
import {TodoContext} from '../context/todoContext';
import {getTodoList, storeTodo, updateTodoFunc} from '../service/api';
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
  const textInputRef = useRef(null);

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
      setSearchText('');
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
    textInputRef.current.focus();
  };

  const handleSearch = text => {
    setSearchText(text);
    const filteredTodoList = todoList.filter(todo =>
      todo.text.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredTodoList(filteredTodoList);
  };

  const cancelFunc = () => {
    setIsEditing(false);
    setValue('');
    textInputRef.current.blur();
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
              <SearchInput
                handleSearch={handleSearch}
                searchText={searchText}
                setIsKeyboardAvoidingEnabled={setIsKeyboardAvoidingEnabled}
              />

              <TodoList
                updateTodoItem={updateTodoItem}
                data={searchText ? filteredTodoList : todoList}
              />
            </>
          ) : (
            <NoData />
          )}
        </View>

        {isKeyboardAvoidingEnabled && (
          <View style={styles.addTodoContainer}>
            <TodoTextInput
              value={value}
              onChangeText={text => setValue(text)}
              textInputRef={textInputRef}
            />
            <AddOrUpdateButton
              addOrUpdateTodo={addOrUpdateTodo}
              value={value}
            />
            <CancelButton cancelFunc={cancelFunc} />
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
});
