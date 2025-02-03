import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import EventService from '@/services/EventService';

interface CreateGroupEventModalProps {
  visible: boolean;
  locationName: string; // Name passed from parent modal
  onClose: () => void;
}

const CreateGroupEventModal: React.FC<CreateGroupEventModalProps> = ({
  visible,
  locationName,
  onClose,
}) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPeople, setMaxPeople] = useState('');

  // Get the current user's username from context
  const { username } = useAuth();

  const handleCreateEvent = async () => {
    // 1. Validate fields (cannot be empty)
    if (!eventName.trim() || !date.trim() || !time.trim() || !maxPeople.trim()) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      // 2. Convert maxPeople to a number
      const nrMembers = parseInt(maxPeople, 10);
      if (isNaN(nrMembers)) {
        Alert.alert('Error', 'Maximum people allowed must be a number!');
        return;
      }

      // 3. Insert new event into Firebase
      await EventService.insert({
        admin: username,
        location: locationName,
        nrMembers,
        members: [username], 
        time,
        date,
        name: eventName, 
      } as any); // Using `as any` if your Event interface doesn't yet have `name`

      Alert.alert('Success', 'Event created successfully!');
      // 4. Close the modal
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Could not create event');
      console.error('Error creating event:', error);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Your new group event</Text>

          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a name for your event"
            value={eventName}
            onChangeText={setEventName}
          />

          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 24.02"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Time:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 18:00"
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Maximum people allowed:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 10"
            value={maxPeople}
            onChangeText={setMaxPeople}
            keyboardType="numeric"
          />

          <Text style={styles.locationText}>Location: {locationName}</Text>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
            <Text style={styles.createButtonText}>Create the event!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateGroupEventModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#25292e',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: '#ffd33d',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 4,
    padding: 8,
    borderRadius: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#eee',
    marginVertical: 8,
  },
  createButton: {
    backgroundColor: '#ffd33d',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  createButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
