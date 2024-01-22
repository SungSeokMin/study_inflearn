import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

import axios, { AxiosError } from 'axios';

import { RootStackParamList } from '../../../types/screen.types';

import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';

import { useAppDispatch } from '../../store';
import { setUser } from '../../slices/user';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: SignInProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canGoNext = useMemo(() => !!email && !!password, [email, password]);

  const toSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);

  const onSubmit = useCallback(async () => {
    if (loading) return;

    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }

    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }

    try {
      setLoading(true);

      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password
      });

      Alert.alert('알림', '로그인 되었습니다.');

      dispatch(
        setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken
        })
      );

      await EncryptedStorage.setItem('refreshToken', response.data.data.refreshToken);
    } catch (error) {
      const errorResponse = (error as AxiosError<{ message: string }>).response;

      console.log('🔥SignIn: 74줄🔥', error);
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, loading, password]);

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          importantForAutofill="yes"
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
          clearButtonMode="while-editing"
          placeholder="이메일을 입력해주세요."
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          importantForAutofill="yes"
          autoComplete="password"
          secureTextEntry
          placeholder="비밀번호를 입력해주세요."
          onSubmitEditing={onSubmit}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          onPress={onSubmit}
          disabled={!canGoNext}
        >
          {loading ? <ActivityIndicator /> : <Text style={styles.loginButtonText}>로그인</Text>}
        </Pressable>

        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  buttonGroup: {
    alignItems: 'center'
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: 'gray',
    borderRadius: 5
  },
  loginButtonActive: {
    backgroundColor: 'blue'
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white'
  }
});

export default SignIn;
