import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type { Location } from '@/services/LocationService';

interface LocationModalProps {
  visible: boolean;
  location?: Location;
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
    return null;
  }

  const { pictures, name, description, opens, closes, price, address: loc } = location;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* First row: pictures in a horizontal scroll */}
          {pictures && pictures.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {pictures.map((pic, index) => {
                let imageSource;

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
                  case 'baschet1.png':
                    imageSource = require('@/assets/images/baschet1.png');
                    break;
                  case 'escroom1.png':
                    imageSource = require('@/assets/images/escroom1.png');
                    break;
                  default:
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

          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>

          {(opens || closes) && (
            <Text style={styles.description}>
              Open hours: {opens ?? '—'} - {closes ?? '—'}
            </Text>
          )}

          {/* Display location if available */}
          {loc && <Text style={styles.description}>Location: {loc}</Text>}

          {/* Display price if available */}
          {price !== undefined && (
            <Text style={styles.description}>Price: {price}</Text>
          )}

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.customButton} onPress={onCreateGroupEvent}>
              <Text style={styles.customButtonText}>Create a Group Event</Text>
            </TouchableOpacity>
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
    width: 200, 
    height: 200, 
    borderRadius: 10,
    marginRight: 12, 
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
  buttonWrapper: {
    marginTop: 12,
    borderRadius: 6,
  },
  customButton: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  customButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
