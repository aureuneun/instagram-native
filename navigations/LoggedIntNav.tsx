import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabNav from './TabNav';
import UploadNav from './UploadNav';
import { Ionicons } from '@expo/vector-icons';
import UploadForm from '../screens/UploadForm';

export type StackParamList = {
  Tab: undefined;
  Upload: undefined;
  UploadForm: { file: string };
};

const Stack = createStackNavigator<StackParamList>();

const LoggedInNav = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false }}
        component={TabNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: 'Upload',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
