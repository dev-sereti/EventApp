import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event'; // Correct import

const EventDetailScreen = ({route}) => {
  const {event} = route.params;

  const handleRSVP = () => {
    Alert.alert('RSVP Confirmed', `You have RSVP'd to ${event.name}!`);
  };

  const handleSaveToCalendar = () => {
    // Ensure date strings are in the correct ISO format with milliseconds
    const getISODate = (dateString) => {
      if (!dateString) return undefined;
      try {
        return new Date(dateString).toISOString();
      } catch {
        return undefined;
      }
    };

    const eventConfig = {
      title: event.name,
      startDate: getISODate(event.date),
      endDate: getISODate(event.endDate) || getISODate(event.date),
      location: event.location,
      notes: event.description,
    };

    // Defensive check for the module
    if (typeof AddCalendarEvent.presentEventCreatingDialog !== 'function') {
      Alert.alert(
        'Error',
        'Calendar module is not available. Please rebuild the app and try again.'
      );
      return;
    }

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {
        if (eventInfo && eventInfo.action === 'SAVED') {
          Alert.alert('Success', 'Event saved to calendar!');
        }
      })
      .catch(error => {
        console.warn('Error saving to calendar:', error);
        Alert.alert('Error', 'Could not save event to calendar.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: event.imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.sectionTitle}>About This Event</Text>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rsvpButton} onPress={handleRSVP}>
            <Text style={styles.rsvpButtonText}>RSVP Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={handleSaveToCalendar}>
            <Text style={styles.calendarButtonText}>Add to Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 16,
  },
  categoryBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 12,
  },
  rsvpButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventDetailScreen;