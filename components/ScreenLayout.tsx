import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IScreenLayoutProps {
  loading: boolean;
}

const ScreenLayout: React.FC<IScreenLayoutProps> = ({ loading, children }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
};

export default ScreenLayout;
