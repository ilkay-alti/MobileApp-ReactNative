import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from 'react-native-paper';
import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/core';

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setEmail(user?.email ?? '');
    });
  }, []);

  const createChat = async () => {
    if (!email || !userEmail) return;
    setIsLoading(true);
    const response = await firebase
      .firestore()
      .collection('chats')
      .add({
        users: [email, userEmail],
      });
    setIsLoading(false);
    setIsDialogVisible(false);

    navigation.navigate('Chat', { chatId: response.id });
  };

  const [chats, setChats] = useState([]);

  useEffect(() => {
    return firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', email)
      .onSnapshot((querySnapshot) => {
        setChats(querySnapshot.docs);
      });
  }, [email]);

  return (
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (
        <React.Fragment>
          <List.Item
            onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
            title={chat.data().users.find((x) => x !== email)}
            description="Hi There"
            left={() => (
              <Avatar.Text
                label={chat
                  .data()
                  .users.find((x) => x !== email)
                  .split(' ')
                  .reduce((prev, current) => prev + current[0], '')}
                size={50}
              />
            )}
          />
          <Divider inset />
        </React.Fragment>
      ))}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)} //bosluga t??kland??g??nda
        >
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter user email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              keyboardType="email-address"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={() => createChat()} loading={isLoading}>
              Chat
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

export default ChatList;
