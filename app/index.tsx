import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import Button from '@/components/Button';

export default function Index() {   // actually login
  const router = useRouter();

  function handleLogin() {
    router.replace('/(tabs)'); // Navigate to the tabs
    alert('You are succesfully logged in!');  // DEBUG
  }

  function handleSignUp() {
    alert('You are succesfully logged in!');  // TODO
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
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
  title: {
    fontSize: 24, 
    marginBottom: 16 ,
    color: '#fff'
  },
});