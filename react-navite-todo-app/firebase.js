import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// add firebase config here
const firebaseConfig = {
  apiKey: 'AIzaSyDhNM--74JhMSZs8d_GDfx4xk_Nkm_k0_M',
  authDomain: 'react-native-todo-app-33c74.firebaseapp.com',
  projectId: 'react-native-todo-app-33c74',
  storageBucket: 'react-native-todo-app-33c74.appspot.com',
  messagingSenderId: '204514882573',
  appId: '1:204514882573:web:89abaf0bc79b3a71031144',
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
