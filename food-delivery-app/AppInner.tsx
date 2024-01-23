import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import axios, { AxiosError } from 'axios';

import Orders from './src/pages/orders/Orders';
import Delivery from './src/pages/delivery/Delivery';
import SignIn from './src/pages/signIn/SignIn';
import SignUp from './src/pages/signUp/SignUp';
import Settings from './src/pages/settings/Settings';

import useSocket from './src/hooks/useSocket';

import { useAppDispatch } from './src/store';
import { selectIsLoggedIn, setUser } from './src/slices/user';

import { LoggedInParamList, RootStackParamList } from './types/screen.types';

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppInner = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
    };

    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', callback);
    }

    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) disconnect();
  }, [disconnect, isLoggedIn]);

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');

        if (!token) return;

        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(
          setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken
          })
        );
      } catch (error) {
        const errorResponse = (error as AxiosError<{ code: string }>).response;

        if (errorResponse?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        // TODO: 스플래쉬 스크린 삭제
      }
    };

    getTokenAndRefresh();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Orders" component={Orders} options={{ title: '오더 목록' }} />
          <Tab.Screen name="Delivery" component={Delivery} options={{ headerShown: false }} />
          <Tab.Screen name="Settings" component={Settings} options={{ title: '내 정보' }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{ title: '로그인' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppInner;
