import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type { Location } from '@/services/LocationService';

interface LocationModalProps {
  visible: boolean;
  location?: Location; // May be undefined if modal not needed
  onClose: () => void;
  onCreateGroupEvent: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  location,
  onClose,
  onCreateGroupEvent,
}) => {
  if (!location) {
    // If no location data, don’t render the modal
    return null;
  }

  const { pictures, name, description, opens, closes } = location;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close button (optional) */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

          {/* First row: pictures in a horizontal scroll */}
            {pictures && pictures.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {pictures.map((pic, index) => {
                let imageSource;

                // Switch on the filename, required by metro
                switch (pic) {
                    case 'gravity1.png':
                    imageSource = require('@/assets/images/gravity1.png');
                    break;
                    case 'gravity2.png':
                    imageSource = require('@/assets/images/gravity2.png');
                    break;
                    case 'gravity3.png':
                    imageSource = require('@/assets/images/gravity3.png');
                    break;
                    default:
                    // Fallback for anything else
                    imageSource = require('@/assets/images/default.png');
                    break;
                }

                return (
                    <Image
                    key={index}
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                    />
                );
                })}
            </ScrollView>
            )}

          {/* Name */}
            <Text style={styles.title}>{name}</Text>

          {/* Description */}
            <Text style={styles.description}>{description}</Text>

          {/* Open hours (if any) */}
            {(opens || closes) && (
                <Text style={styles.hours}>
                Open hours: {opens ?? '—'} - {closes ?? '—'}
                </Text>
            )}

          {/* Create Group Event button */}
            <View style={styles.buttonWrapper}>
                <Button title="Create a Group Event" onPress={onCreateGroupEvent} />
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalContainer: {
    margin: 16,
    backgroundColor: '#25292e',
    borderRadius: 8,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    color: '#ffd33d',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 8,
  },
  hours: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 12,
  },
});
