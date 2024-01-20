import {useCallback, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canGoNext = useMemo(() => !!email && !!password, [email, password]);

  const onSubmit = useCallback(() => {}, []);

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          placeholder="이메일을 입력해주세요."
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해주세요."
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
          disabled={canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>

        <Pressable>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonGroup: {
    alignItems: 'center',
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SignIn;
