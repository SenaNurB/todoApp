import React, {useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import useTodos from '../hooks/useTodos';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import constantColors from '../constants/Color';

const MainScreen = () => {
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(null);
  const [isKeyboardAvoidingEnabled, setIsKeyboardAvoidingEnabled] =
    useState(true);
  const textInputRef = useRef(null);
  const {
    todoList,
    filteredTodoList,
    isLoading,
    error,
    searchText,
    setSearchText,
    handleSearch,
    addOrUpdateTodo,
  } = useTodos();

  const handleAddOrUpdateTodo = async () => {
    const todoData = {
      text: value,
      date: isEditing ? updateTodo.date : new Date(),
      checked: isEditing ? updateTodo.checked : false,
    };
    await addOrUpdateTodo(todoData, isEditing, updateTodo);
    setValue('');
    setIsEditing(false);
    setSearchText('');
  };

  const handleUpdateTodo = item => {
    setValue(item.text);
    setIsEditing(true);
    setUpdateTodo(item);
    textInputRef.current.focus();
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setValue('');
    textInputRef.current.blur();
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
        <View style={styles.todoContainer}>
          <Text style={styles.headerText}>TODO's</Text>
          {todoList.length > 0 ? (
            <>
              <SearchInput
                handleSearch={handleSearch}
                searchText={searchText}
                setIsKeyboardAvoidingEnabled={setIsKeyboardAvoidingEnabled}
              />
              <TodoList
                updateTodoItem={handleUpdateTodo}
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
              onChangeText={setValue}
              textInputRef={textInputRef}
            />
            <AddOrUpdateButton
              addOrUpdateTodo={handleAddOrUpdateTodo}
              value={value}
              isEditing={isEditing}
            />
            <CancelButton cancelFunc={cancelUpdate} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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

export default MainScreen;
