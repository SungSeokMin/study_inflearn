import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
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
import { selectIsLoggedIn, setAccessToken, setUser } from './src/slices/user';

import { LoggedInParamList, RootStackParamList } from './types/screen.types';
import { Order, addOrder } from './src/slices/order';

import usePermissions from './src/hooks/usePermissions';

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppInner = () => {
  usePermissions();

  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [socket, disconnect] = useSocket();

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = (error as AxiosError).config;
        const errorResponse = (error as AxiosError<{ code: string }>).response;

        if (errorResponse?.status === 419) {
          if (errorResponse.data.code === 'expired') {
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const { data } = await axios.post(
              `${Config.API_URL}/refreshToken`,
              {},
              { headers: { authorization: `Bearer ${refreshToken}` } }
            );

            dispatch(setAccessToken(data.data.accessToken));

            if (originalRequest) {
              originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
              return axios(originalRequest);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    const callback = (data: Order) => {
      dispatch(addOrder(data));
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
  }, [dispatch, isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) disconnect();
  }, [disconnect, isLoggedIn]);

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');

        if (!token) {
          SplashScreen.hide();
          return;
        }

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
        SplashScreen.hide();
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
