import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabScreen from './src/components/bottomTabScreen/BottomTabScreen';
import Status from './src/screens/Status';
import FriendProfile from './src/screens/FriendProfile';
import EditProfile from './src/screens/EditProfile';
import { RootStackParamList } from './src/types/navigator.types';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
