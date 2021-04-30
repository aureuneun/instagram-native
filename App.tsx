import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigations/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import LoggedInNav from './navigations/LoggedIntNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const cacheImages = () => {
    const images = [require('./assets/logo.png')];
    return images.map((image) => {
      Asset.loadAsync(image);
    });
  };
  const cacheFonts = () => {
    const fonts = [Ionicons.font];
    return fonts.map((font) => {
      Font.loadAsync(font);
    });
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    });
    const fonts = cacheFonts();
    const images = cacheImages();
    await Promise.all([...fonts, ...images]);
  };
  if (loading) {
    return (
      <AppLoading
        onFinish={onFinish}
        startAsync={preload}
        onError={console.warn}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
