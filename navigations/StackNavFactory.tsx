import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Me from '../screens/Me';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import { RouteProp } from '@react-navigation/core';

export type StackFactoryParamList = {
  Any: undefined;
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Me: undefined;
  Profile: undefined;
  Photo: undefined;
};

export type Props = {
  route: RouteProp<StackFactoryParamList, 'Any'>;
  navigation: StackNavigationProp<StackFactoryParamList, 'Any'>;
};

interface IStackNavFactoryProps {
  screenName: 'Feed' | 'Search' | 'Notifications' | 'Me';
}

const Stack = createStackNavigator<StackFactoryParamList>();

const StackNavFactory: React.FC<IStackNavFactoryProps> = ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          shadowColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}
    >
      {screenName === 'Feed' ? (
        <Stack.Screen name="Feed" component={Feed} />
      ) : null}
      {screenName === 'Search' ? (
        <Stack.Screen name={'Search'} component={Search} />
      ) : null}
      {screenName === 'Notifications' ? (
        <Stack.Screen name={'Notifications'} component={Notifications} />
      ) : null}
      {screenName === 'Me' ? <Stack.Screen name={'Me'} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
};

export default StackNavFactory;
