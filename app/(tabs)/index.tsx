import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Button 
} from 'react-native';
import LocationService, { Location } from '@/services/LocationService';

// Import your modal component (adjust the path if needed)
import LocationDetails from '@/components/LocationDetails';

export default function Index() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    activity: false,
    hobby: false,
    unwind: false,
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await LocationService.get();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const toggleFilter = (type: 'activity' | 'hobby' | 'unwind') => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const isAnyFilterActive = filters.activity || filters.hobby || filters.unwind;
  const filteredLocations = isAnyFilterActive
    ? locations.filter((loc) =>
        filters[loc.type as 'activity' | 'hobby' | 'unwind']
      )
    : locations;

  const openLocationModal = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const closeLocationModal = () => {
    setSelectedLocation(undefined);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading locations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter buttons row */}
      <View style={styles.filterRow}>
        <Pressable
          onPress={() => toggleFilter('activity')}
          style={[
            styles.filterButton,
            filters.activity && styles.filterButtonActive,
          ]}
        >
          <Text style={styles.filterButtonText}>Activity</Text>
        </Pressable>

        <Pressable
          onPress={() => toggleFilter('hobby')}
          style={[
            styles.filterButton,
            filters.hobby && styles.filterButtonActive,
          ]}
        >
          <Text style={styles.filterButtonText}>Hobby</Text>
        </Pressable>

        <Pressable
          onPress={() => toggleFilter('unwind')}
          style={[
            styles.filterButton,
            filters.unwind && styles.filterButtonActive,
          ]}
        >
          <Text style={styles.filterButtonText}>Unwind</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.type}>Type: {item.type}</Text>
            <Text style={styles.type}></Text>

            <Pressable
              style={styles.viewDetailsButton}
              onPress={() => openLocationModal(item)}
            >
              <Text style={styles.viewDetailsButtonText}>View Details</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Location Details Modal */}
      <LocationDetails 
        visible={modalVisible}
        location={selectedLocation}
        onClose={closeLocationModal}
        onCreateGroupEvent={() => {
          // Add your logic for creating a group event here
          console.log('Group event created');
        }}
      />
    </View>
  );
}

const BUTTON_INACTIVE_COLOR = '#333';
const BUTTON_ACTIVE_COLOR = '#ffd33d';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    backgroundColor: BUTTON_INACTIVE_COLOR,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: BUTTON_ACTIVE_COLOR,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    color: '#ffd33d',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 4,
  },
  type: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  viewDetailsButton: {
    backgroundColor: '#fff', // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginTop: 8,
  },
  viewDetailsButtonText: {
    color: '#000', // Black text color
    fontWeight: '600',
    fontSize: 16,
  },
});
