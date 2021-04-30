import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabNav from './TabNav';
import UploadNav from './UploadNav';

export type StackParamList = {
  Tab: undefined;
  Upload: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const LoggedInNav = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
