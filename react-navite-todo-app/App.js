import { Provider } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './redux/store';

import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  const hideHeader = { headerShown: false };

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ ...hideHeader }} />
            <Stack.Screen name="Main" component={MainScreen} options={{ ...hideHeader }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
