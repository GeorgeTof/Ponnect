import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import UserService, {User} from '@/services/UserService'; 

export default function ProfileScreen() {
  const { username } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a way to get the current user ID 
        const userId = username; 
        const currentUser = await UserService.getById(userId); 
        if (currentUser) {
          setUser(currentUser);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading user data...</Text>
      </View>
    );
  }

  if (error) {
    console.error('Error fetching user data:', error);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error loading user data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>
      <Text style={styles.text}>
        {`Age: ${user?.age || ''}`}
      </Text>
      <Text style={styles.text}>
        {`Nickname: ${user?.nickname || ''}`}
      </Text>
      <Text style={styles.text}>
        {`Specialization: ${user?.specialization || ''}`}
      </Text>
      <Text style={styles.text}>
        {`University: ${user?.university || ''}`}
      </Text>
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
