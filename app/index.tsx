import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {   // actually login
  const router = useRouter();

  function handleLogin() {
    // ... authenticate the user ...
    router.replace('/(tabs)'); // Navigate to the tabs
    alert('You are succesfully logged in!');  // DEBUG
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
});