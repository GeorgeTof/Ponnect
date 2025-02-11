import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import EventService, { Event } from '@/services/EventService';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    joined: false,
    mine: false,
  });

  // The current user from your Auth context
  const { username } = useAuth();

  /**
   * Fetch all events from Firestore.
   * Use this function both on mount and
   * whenever the "My Events" filter is enabled.
   */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await EventService.get();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Toggle a specific filter on/off
  // If user toggles "mine" ON, refetch the data
  const toggleFilter = (key: 'joined' | 'mine') => {
    setFilters((prevFilters) => {
      const newValue = !prevFilters[key];
      const updatedFilters = { ...prevFilters, [key]: newValue };

      // If toggling 'mine' to true, refetch events from Firebase
      if (key === 'mine' && newValue) {
        fetchEvents();
      }
      return updatedFilters;
    });
  };

  // Determine the label for the action button
  const getButtonLabel = (eventItem: Event) => {
    if (eventItem.admin === username) {
      return 'Delete';
    } else if (eventItem.members.includes(username)) {
      return 'Leave';
    } else {
      return 'Join';
    }
  };

  // Handle button presses depending on the label
  const handleEventAction = async (eventItem: Event) => {
    const label = getButtonLabel(eventItem);

    try {
      if (label === 'Delete') {
        console.log(`User ${username} wants to delete event: ${eventItem.id}`);
        await EventService.delete(eventItem.id);
        setEvents((prevEvents) =>
          prevEvents.filter((ev) => ev.id !== eventItem.id)
        );
      } else if (label === 'Leave') {
        console.log(`User ${username} wants to leave event: ${eventItem.id}`);
        const updatedMembers = eventItem.members.filter(
          (member) => member !== username
        );
        // Update Firestore
        await EventService.update(eventItem.id, { members: updatedMembers });
        // Reflect the change in local state
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === eventItem.id ? { ...ev, members: updatedMembers } : ev
          )
        );
      } else {
        console.log(`User ${username} wants to join event: ${eventItem.id}`);
        const updatedMembers = [...eventItem.members, username];
        // Update Firestore
        await EventService.update(eventItem.id, { members: updatedMembers });
        // Reflect the change in local state
        setEvents((prevEvents) =>
          prevEvents.map((ev) =>
            ev.id === eventItem.id ? { ...ev, members: updatedMembers } : ev
          )
        );
      }
    } catch (error) {
      console.error(`Error performing '${label}' action:`, error);
    }
  };

  // If any filter is active, filter accordingly
  const filteredEvents = (() => {
    if (!filters.joined && !filters.mine) {
      return events; // No filters active => show all
    }
    return events.filter((event) => {
      // If 'joined' filter is active, user must be in event.members
      if (filters.joined && !event.members.includes(username)) {
        return false;
      }
      // If 'mine' filter is active, user must be event.admin
      if (filters.mine && event.admin !== username) {
        return false;
      }
      return true;
    });
  })();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffd33d" />
        <Text style={styles.text}>Loading events...</Text>
      </View>
    );
  }

  // Render an individual event item
  const renderItem = ({ item }: { item: Event }) => {
    return (
      <View style={styles.eventItem}>
        {/* 
          1) Changed from "... {item.admin}'s Event" 
             to "... {item.name}" 
             per your request. 
        */}
        <Text style={styles.eventName}>{item.name}</Text>

        <Text style={styles.eventInfo}>Location: {item.location}</Text>
        <Text style={styles.eventInfo}>Max Members: {item.nrMembers}</Text>
        <Text style={styles.eventInfo}>
          Current Members: {item.members.join(',\n   ') || 'None'}
        </Text>
        <Text style={styles.eventInfo}>Date: {item.date}</Text>
        <Text style={styles.eventInfo}>Time: {item.time}</Text>

        <Pressable style={styles.enrollButton} onPress={() => handleEventAction(item)}>
          <Text style={styles.enrollButtonText}>{getButtonLabel(item)}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Row */}
      <View style={styles.filterRow}>
        {/* "Events I Joined" filter button */}
        <Pressable
          onPress={() => toggleFilter('joined')}
          style={[
            styles.filterButton,
            filters.joined && styles.filterButtonActive,
          ]}
        >
          <Text style={styles.filterButtonText}>Events I Joined</Text>
        </Pressable>

        {/* "My Events" filter button */}
        <Pressable
          onPress={() => toggleFilter('mine')}
          style={[
            styles.filterButton,
            filters.mine && styles.filterButtonActive,
          ]}
        >
          <Text style={styles.filterButtonText}>My Events</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>Group Events</Text>

      <FlatList
        data={filteredEvents}
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
const BUTTON_INACTIVE_COLOR = '#333';
const BUTTON_ACTIVE_COLOR = '#ffd33d';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingHorizontal: 16,
    paddingTop: 16,
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
