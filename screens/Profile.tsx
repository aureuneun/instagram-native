import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Props } from '../navigations/StackNavFactory';

const Profile = ({ navigation }: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
        <Text style={{ color: 'white' }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
