import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const AuthLayout: React.FC = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      <Container>
        <KeyboardAvoidingView
          behavior="position"
          style={{
            width: '100%',
          }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AuthLayout;
