import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard: React.FC = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
