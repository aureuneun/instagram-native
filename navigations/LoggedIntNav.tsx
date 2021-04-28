import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';

export type TabParamList = {
  Feed: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const LoggedInNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
    </Tab.Navigator>
  );
};

export default LoggedInNav;
