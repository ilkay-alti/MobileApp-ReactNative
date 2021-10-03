import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Subheading } from 'react-native-paper';
import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/core';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      navigation.popToTop();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      {!!error && (
        <Subheading
          style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}
        >
          {error}
        </Subheading>
      )}
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        style={{ marginTop: 20 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        style={{ marginTop: 20 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <Button compact onPress={() => navigation.navigate('SignIn')}>
          Sıng In
        </Button>
        <Button
          mode="contained"
          onPress={() => createAccount()}
          loading={isLoading}
        >
          Sıng Up
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
