import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import UserService, { User } from '@/services/UserService';
import Button from '@/components/Button';


export default function ProfileScreen() {
  const { username } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null); 
  const [isModified, setIsModified] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a way to get the current user ID 
        const userId = username; 
        const currentUser = await UserService.getById(userId); 
        if (currentUser) {
          setUser(currentUser);
          setEditedUser(currentUser); // Initialize editedUser with original data
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

  const handleInputChange = (key: keyof User, value: string | number | undefined) => {
    setEditedUser({ ...editedUser, [key]: value } as User);
    setIsModified(true); 
  };

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
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Nickname:</Text>
        <TextInput 
          style={styles.input} 
          value={editedUser?.nickname || ''} 
          onChangeText={(text) => handleInputChange('nickname', text)} 
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={editedUser?.age?.toString() || ''} 
          onChangeText={(text) => handleInputChange('age', text ? parseInt(text) : undefined)} 
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Specialization:</Text>
        <TextInput 
          style={styles.input} 
          value={editedUser?.specialization || ''} 
          onChangeText={(text) => handleInputChange('specialization', text)} 
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>University:</Text>
        <TextInput 
          style={styles.input} 
          value={editedUser?.university || ''} 
          onChangeText={(text) => handleInputChange('university', text)} 
        />
      </View>
      {/* Add a button to save changes (if needed) */}
      {isModified && (
        <View style={styles.buttonContainer}>
          <Button 
            label="Save Changes" 
            theme="secondary"
            onPress={() => { 
              // Handle saving the editedUser data 
              console.log('Saving changes:', editedUser); 
              // Call UserService.updateUser(userId, editedUser) 
            }} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20, 
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd33d', 
    marginBottom: 20,
    textAlign: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#fff', 
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
  },
  text: {
    color: '#fff',
  },
    buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
