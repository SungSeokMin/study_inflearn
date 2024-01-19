import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Activity from '../../screens/Activity';
import Profile from '../../screens/Profile';
import { ParamListBase, RouteProp } from '@react-navigation/native';

interface ITabBarIcon {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase, string>;
}

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();

  const handleTabBarIcon = ({ focused, size, color, route }: ITabBarIcon) => {
    const routeName = route.name;

    let iconName: string = '';

    if (routeName === 'Home') {
      iconName = focused ? 'home-sharp' : 'home-outline';
    } else if (routeName === 'Search') {
      iconName = focused ? 'search' : 'search-outline';
    } else if (routeName === 'Activity') {
      iconName = focused ? 'heart' : 'heart-outline';
    } else if (routeName === 'Profile') {
      iconName = focused ? 'person-circle' : 'person-outline';
    }

    return <Ionic name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarIcon: ({ focused, color, size }) => {
          return handleTabBarIcon({ focused, size, color, route });
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
