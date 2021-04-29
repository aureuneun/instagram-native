import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { logUserOut } from '../apollo';
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
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: 'white' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Me;
