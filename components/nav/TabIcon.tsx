import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ITabIconProps {
  iconName: string;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<ITabIconProps> = ({ iconName, color, focused }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
};

export default TabIcon;
