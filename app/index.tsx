import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import Button from '@/components/Button';

export default function Index() {   // actually the login page
  const router = useRouter();
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUsername } = useAuth();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, localUsername, password);
      alert('Logged in successfully!');
      setUsername(localUsername);
      router.replace('/(tabs)');
    } catch (error) {
      alert((error as any).message || 'Failed to log in');
    }
  }

  async function handleSignUp() {
    try {
      await createUserWithEmailAndPassword(auth, localUsername, password);
      alert('User created successfully!');
    } catch (error) {
      alert((error as any).message || 'Failed to create user');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>

      <Text style={styles.largeSeparator}> </Text>
      <Text style={styles.largeSeparator}> </Text>

      <Text style={styles.label}>User Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
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