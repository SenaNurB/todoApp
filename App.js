import React from 'react';
import TodoContextProvider from './src/context/todoContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TodoContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContextProvider>
  );
};

export default App;
