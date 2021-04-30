import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import { createStackNavigator } from '@react-navigation/stack';

export type StackParamList = {
  Select: undefined;
};

export type TopTabParamList = {
  Select: undefined;
  Take: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabParamList>();
const Stack = createStackNavigator<StackParamList>();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: 'black',
        },
        activeTintColor: 'white',
        indicatorStyle: {
          backgroundColor: 'white',
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'white',
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: 'black',
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              options={{ title: 'Choose a photo' }}
              name="Select"
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default UploadNav;
