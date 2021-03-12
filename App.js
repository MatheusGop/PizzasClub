/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import MakePizza from './src/pages/MakePizza';
import SelectFilling from './src/pages/SelectFilling';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName="Home">
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="MakePizza" component={MakePizza} />
          <Stack.Screen options={{ headerShown: false }} name="SelectFilling" component={SelectFilling} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
