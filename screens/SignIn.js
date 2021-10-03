import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Subheading } from 'react-native-paper';
import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/core';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const singIn = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
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
        <Button compact onPress={() => navigation.navigate('SignUp')}>
          Sıng Up
        </Button>
        <Button mode="contained" onPress={() => singIn()} loading={isLoading}>
          Sıng In
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
