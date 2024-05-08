import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import TodoTextInput from './src/components/TodoTextInput';
import TodoList from './src/components/TodoList';

const data = [
  {
    id: '1',
    text: 'asjkdhjksahdksajdhkas klasjdklsajdlsakdja ksajdlskajdlasjdla dkjfklsdjflajflsdfjakldjfaklfjaljfalslkadjlasjdalskdjal',
    checked: false,
  },
  {
    id: '2',
    text: 'asjkdhjksahdksajdhkas klasjdklsajdlsakdja ksajdlskajdlasjdla asjdnksadnsak kjasdhksahkdsa',
    checked: false,
  },
];

const App = () => {
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.todoContainer}>
          <Text style={styles.headerText}>TODO's</Text>

          <TodoList data={data} />
        </View>

        <View style={styles.addTodoContainer}>
          <TodoTextInput value={value} setValue={setValue} />
          <TouchableOpacity style={styles.addButton}></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

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
