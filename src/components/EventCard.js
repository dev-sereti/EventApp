import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {AddCalendarEvent} from 'react-native-add-calendar-event';

const EventCard = ({event, onPress, onRSVP}) => {
  const handleSaveToCalendar = () => {
    const eventConfig = {
      title: event.name,
      startDate: event.date,
      endDate: event.endDate || event.date,
      location: event.location,
      notes: event.description,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {
        if (eventInfo.action === 'SAVED') {
          Alert.alert('Success', 'Event saved to calendar!');
        }
      })
      .catch(error => {
        console.warn('Error saving to calendar:', error);
      });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rsvpButton} onPress={onRSVP}>
            <Text style={styles.rsvpButtonText}>RSVP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={handleSaveToCalendar}>
            <Text style={styles.calendarButtonText}>Save to Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rsvpButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  rsvpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  calendarButtonText: {
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default EventCard;