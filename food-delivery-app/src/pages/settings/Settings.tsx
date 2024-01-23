import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

import axios, { AxiosError } from 'axios';

import { useAppDispatch } from '../../store';
import { selectAccessToken, selectMoney, selectName, setMoney, setUser } from '../../slices/user';

import EncryptedStorage from 'react-native-encrypted-storage';

function Settings() {
  const dispatch = useAppDispatch();

  const accessToken = useSelector(selectAccessToken);
  const money = useSelector(selectMoney);
  const name = useSelector(selectName);

  useEffect(() => {
    async function getMoney() {
      const response = await axios.get<{ data: number }>(`${Config.API_URL}/showmethemoney`, {
        headers: { authorization: `Bearer ${accessToken}` }
      });

      dispatch(setMoney(response.data.data));
    }

    getMoney();
  }, [accessToken, dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
      );

      Alert.alert('알림', '로그아웃 되었습니다.');

      dispatch(
        setUser({
          name: '',
          email: '',
          accessToken: ''
        })
      );

      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);

  return (
    <View>
      <View style={styles.money}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{' '}
          <Text style={styles.moneyTextBold}>{money.toLocaleString('ko-KR')}</Text>원
        </Text>
      </View>

      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(styles.loginButton, styles.loginButtonActive)}
          onPress={onLogout}
        >
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  loginButtonActive: {
    backgroundColor: 'blue'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16
  },
  money: {
    padding: 20
  },
  moneyText: {
    fontSize: 16
  },
  moneyTextBold: {
    fontWeight: 'bold'
  }
});

export default Settings;
