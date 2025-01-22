import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import Button from '@/components/Button';

export default function Index() {   // actually login
  const router = useRouter();

  function handleLogin() {
    router.replace('/(tabs)'); // Navigate to the tabs
    alert('You are succesfully logged in!');  // DEBUG
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
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
    color: '#fff',
  },
  title: {
    fontSize: 24, 
    marginBottom: 16 ,
    color: '#fff'
  },
});