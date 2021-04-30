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
import { Image } from 'react-native';
import Comments from '../screens/Comments';
import Likes from '../screens/Likes';

export type StackFactoryParamList = {
  Any: undefined;
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Me: undefined;
  Profile: { username: string };
  Photo: { id: string };
  Comments: undefined;
  Likes: { id: string };
};

export type Props = {
  route: RouteProp<StackFactoryParamList, 'Any'>;
  navigation: StackNavigationProp<StackFactoryParamList, 'Any'>;
};

export type LikesProps = {
  route: RouteProp<StackFactoryParamList, 'Likes'>;
  navigation: StackNavigationProp<StackFactoryParamList, 'Likes'>;
};

export type ProfileProps = {
  route: RouteProp<StackFactoryParamList, 'Profile'>;
  navigation: StackNavigationProp<StackFactoryParamList, 'Profile'>;
};

export type PhotoProps = {
  route: RouteProp<StackFactoryParamList, 'Photo'>;
  navigation: StackNavigationProp<StackFactoryParamList, 'Photo'>;
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
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require('../assets/logo.png')}
              />
            ),
          }}
        />
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
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Likes" component={Likes} />
    </Stack.Navigator>
  );
};

export default StackNavFactory;
