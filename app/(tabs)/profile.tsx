import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import UserService, { User } from '@/services/UserService';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const { username } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // `editedUser` holds the changes before they are saved to Firestore.
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // The username is assumed to match the user ID in Firestore.
        const userId = username;
        const currentUser = await UserService.getById(userId);

        if (currentUser) {
          setUser(currentUser);
          setEditedUser(currentUser); // Initialize with fetched data
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

  function logOut() {
    router.replace('../index');
  }

  /**
   * Handle changes to fields in the profile form.
   */
  const handleInputChange = (key: keyof User, value: string | number | undefined) => {
    if (!editedUser) return;
    setEditedUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, [key]: value };
    });
    setIsModified(true);
  };

  /**
   * Save the changes made to the `editedUser` object to Firestore.
   */
  const handleSaveChanges = async () => {
    if (!editedUser) return;

    try {
      // Update the user in Firestore with the edited fields
      await UserService.update(editedUser.id, {
        nickname: editedUser.nickname,
        age: editedUser.age,
        specialization: editedUser.specialization,
        university: editedUser.university,
      });

      // Optionally, re-fetch the user data or merge changes into `user` state
      // to reflect the saved data.
      setUser(editedUser);
      setIsModified(false);

      alert('Success! Your changes have been saved successfully!');
    } catch (updateError) {
      console.error('Error updating user:', updateError);
      alert('Error! There was an issue saving your changes.');
    }
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
      <Text style={styles.username}>Welcome, {editedUser?.nickname}!</Text>

      {/* Nickname */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Nickname:</Text>
        <TextInput
          style={styles.input}
          value={editedUser?.nickname || ''}
          onChangeText={(text) => handleInputChange('nickname', text)}
        />
      </View>

      <Text style={styles.separator} />

      {/* Age */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={editedUser?.age?.toString() || ''}
          onChangeText={(text) => handleInputChange('age', text ? parseInt(text) : undefined)}
        />
      </View>

      <Text style={styles.separator} />

      {/* Specialization */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Specialization:</Text>
        <TextInput
          style={styles.input}
          value={editedUser?.specialization || ''}
          onChangeText={(text) => handleInputChange('specialization', text)}
        />
      </View>

      <Text style={styles.separator} />

      {/* University */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>University:</Text>
        <TextInput
          style={styles.input}
          value={editedUser?.university || ''}
          onChangeText={(text) => handleInputChange('university', text)}
        />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.largeSeparator} />
        <Text style={styles.largeSeparator} />
        <Text style={styles.largeSeparator} />

        {isModified && (
          <View style={styles.buttonContainer}>
            <Button
              label="Save Changes"
              theme="secondary"
              onPress={handleSaveChanges}
            />
            <Text style={styles.separator} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button label="Log Out" theme="danger" onPress={logOut} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    fontSize: 14,
    marginBottom: 4,
  },
  largeSeparator: {
    fontSize: 20,
    marginBottom: 10,
  },
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
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
});
