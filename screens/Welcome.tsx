import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigations/LoggedOutNav';
import { colors } from '../colors';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

type Props = {
  route: RouteProp<StackParamList, 'Welcome'>;
  navigation: StackNavigationProp<StackParamList, 'Welcome'>;
};

const Welcome = ({ route, navigation }: Props) => {
  const goToCreateAccount = () => navigation.navigate('CreateAccount');
  const goToLogIn = () => navigation.navigate('Login');
  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
