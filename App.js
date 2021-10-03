import React, { useEffect } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Chat from './screens/Chat';
import ChatList from './screens/ChatList';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SingUp from './screens/SingUp';

const firebaseConfig = {
  apiKey: 'AIzaSyCbaOshobuM2hhaRnR3-WMIwvA_vjpHWiQ',
  authDomain: 'chat-app-b3ece.firebaseapp.com',
  projectId: 'chat-app-b3ece',
  storageBucket: 'chat-app-b3ece.appspot.com',
  messagingSenderId: '42550227387',
  appId: '1:42550227387:web:4ad381ee12cc3fb0b1d49e',
};

firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('SingUp');
      }
    });
  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === 'ChatList' ? 'chatbubbles' : 'settings'}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="SingUp"
            component={SingUp}
            options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
