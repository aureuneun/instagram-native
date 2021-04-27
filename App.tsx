import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const cacheImages = () => {
    const images = [
      require('./assets/logo.png'),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png',
    ];
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
    <View style={styles.container}>
      <Text>Welcom to expo</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
