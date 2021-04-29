import React from 'react';
import { Text, View } from 'react-native';
import { Props } from '../navigations/StackNavFactory';

const Me = ({ navigation }: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Me</Text>
    </View>
  );
};

export default Me;
