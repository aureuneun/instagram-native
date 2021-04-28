import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '../screens/CreateAccount';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';

export type StackParamList = {
  Welcome: undefined;
  Login: { username: string; password: string } | undefined;
  CreateAccount: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const LoggedOutNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default LoggedOutNav;
