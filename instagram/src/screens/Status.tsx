import React, { useEffect, useRef } from 'react';

import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigator.types';

type StatusProps = NativeStackScreenProps<RootStackParamList, 'Status'>;

const Status = ({ route, navigation }: StatusProps) => {
  const user = route.params;

  const progress = useRef(new Animated.Value(0)).current;
  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    let timer = setTimeout(() => navigation.goBack(), 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const onBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={styles.progress}>
        <Animated.View
          style={{ ...styles.animated, width: progressAnimation }}
        />
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userProfileImageContainer}>
          <Image style={styles.userProfileImage} source={user?.image} />
        </View>

        <View style={styles.userName}>
          <Text style={styles.userNameText}>{user?.name}</Text>

          <TouchableOpacity onPress={onBack}>
            <Ionic name="close" style={styles.closeButton} />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={user?.image} style={styles.storyImage} />

      <View style={styles.margin} />
    </SafeAreaView>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  progress: {
    width: '100%',
    height: 3,
    borderWidth: 1,
    backgroundColor: 'gray',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    position: 'absolute',
    top: 18,
  },
  userInfo: {
    width: '95%',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 12,
    left: 0,
  },
  userProfileImageContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  userProfileImage: {
    width: '92%',
    height: '92%',
    resizeMode: 'cover',
    backgroundColor: 'orange',
    borderRadius: 100,
  },
  userName: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userNameText: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'white',
  },
  closeButton: {
    fontSize: 20,
    color: 'white',
    opacity: 0.6,
  },
  storyImage: {
    width: '100%',
    height: 600,
    position: 'absolute',
  },
  margin: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
  },
  animated: {
    height: '100%',
    backgroundColor: 'white',
  },
});
