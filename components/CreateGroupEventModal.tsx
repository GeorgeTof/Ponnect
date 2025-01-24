import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface CreateGroupEventModalProps {
  visible: boolean;
  locationName: string; // pass the location name here
  onClose: () => void;
}

// No actual Firebase save right now—just a dummy handler
const CreateGroupEventModal: React.FC<CreateGroupEventModalProps> = ({
  visible,
  locationName,
  onClose,
}) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPeople, setMaxPeople] = useState('');

  const handleCreateEvent = () => {
    console.log('Create event called with:', {
      name: eventName,
      date,
      time,
      maximumPeopleAllowed: maxPeople,
      location: locationName,
    });
    // For now, just console.log and close modal
    onClose();
  };

  // If the modal is not visible, return null to avoid rendering overhead
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
            onChangeText={setEventName}
            value={eventName}
          />

          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2024-12-31"
            onChangeText={setDate}
            value={date}
          />

          <Text style={styles.label}>Time:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 18:00"
            onChangeText={setTime}
            value={time}
          />

          <Text style={styles.label}>Maximum people allowed:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 10"
            onChangeText={setMaxPeople}
            value={maxPeople}
            keyboardType="numeric"
          />

          <Text style={styles.locationText}>
            Location: {locationName}
          </Text>

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
