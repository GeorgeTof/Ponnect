import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';

export default function Index() {   // actually login
  const router = useRouter();
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUsername } = useAuth();

  function handleLogin() {
    if (localUsername === 'Admin' && password === 'Password') { // TODO change to real validation
      router.replace('/(tabs)'); 
      setUsername(localUsername);
      alert('You are successfully logged in!'); // DEBUG
    } else {
      alert('Invalid username or password');
    }

  }

  function handleSignUp() {
    alert('You are succesfully logged in!');  // TODO
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <Text style={styles.largeSeparator}> </Text>
      <Text style={styles.largeSeparator}> </Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#888"
        value={localUsername}
        onChangeText={setLocalUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.largeSeparator}> </Text>
      <Text style={styles.largeSeparator}> </Text>


      <Button label="Sign Up" theme='secondary' onPress={handleSignUp} />
      <Text style={styles.separator}> </Text>
      <Button label="Log In" theme='primary' onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14, 
    color: '#fff',
  },
  separator: {
    fontSize: 14, 
    marginBottom: 4,
  },
  largeSeparator: {
    fontSize: 20, 
    marginBottom: 10,
  },
  title: {
    fontSize: 24, 
    marginBottom: 16 ,
    color: '#fff'
  },
    label: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 4,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
});