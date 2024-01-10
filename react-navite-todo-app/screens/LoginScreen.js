import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../firebase';

import ListIcon from '../assets/svg/list.svg';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert(
        '로그인 도중에 문제가 발생하였습니다.',
        error.message,
        [{ text: '닫기', onPress: () => console.log('닫기') }],
        { cancelable: true }
      );
    }
  };

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert(
        '회원가입 도중에 문제가 발생하였습니다.',
        error.message,
        [{ text: '닫기', onPress: () => console.log('닫기') }],
        { cancelable: true }
      );
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace('Main');
    });
  }, []);

  return (
    <View style={styles.container}>
      <ListIcon />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="이메일"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="비밀번호"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleSignup}>
          <Text style={styles.buttonOutlineText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  addFormContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f7f8fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: 500,
    fontSize: 16,
  },
});
