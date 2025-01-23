// EventsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import EventService, { Event } from '@/services/EventService';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events from Firestore on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.get();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Dummy enroll function
  const handleEnroll = (eventId: string) => {
    console.log(`User wants to enroll in event with ID: ${eventId}`);
    // Replace with actual enroll logic
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffd33d" />
        <Text style={styles.text}>Loading events...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Event }) => {
    return (
      <View style={styles.eventItem}>
        <Text style={styles.eventName}>{item.admin}'s Event</Text>
        <Text style={styles.eventInfo}>Location: {item.location}</Text>
        <Text style={styles.eventInfo}>Max Members: {item.nrMembers}</Text>
        <Text style={styles.eventInfo}>
          Current Members: {item.members.join(', ') || 'None'}
        </Text>
        {/* NEW: Display time and date */}
        <Text style={styles.eventInfo}>Date: {item.date}</Text>
        <Text style={styles.eventInfo}>Time: {item.time}</Text>

        <Pressable
          style={styles.enrollButton}
          onPress={() => handleEnroll(item.id)}
        >
          <Text style={styles.enrollButtonText}>Enroll</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.text}>No events available.</Text>
        }
      />
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffd33d',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  eventItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 2,
  },
  enrollButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  enrollButtonText: {
    color: '#000',
    fontWeight: '600',
  },
});
