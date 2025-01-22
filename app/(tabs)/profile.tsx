import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext'; 

export default function ProfileScreen() {
  const { username } = useAuth(); 

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>
      <Text style={styles.text}>Profile screen</Text>
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
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd33d', 
    position: 'absolute',
    top: 40, 
    textAlign: 'center',
  },
  text: {
    color: '#fff',
  },
});
