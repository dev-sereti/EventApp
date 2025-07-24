import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import {FirebaseService} from '../services/firebaseService';
import EventCard from '../components/EventCard';

const EventListScreen = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'Tech', 'Music', 'Sports', 'Art', 'Business'];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, searchText]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await FirebaseService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (searchText) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  };

  const handleRSVP = async (eventId) => {
    try {
      // In a real app, you'd get the user ID from authentication
      const userId = 'user123';
      await FirebaseService.rsvpToEvent(eventId, userId);
      Alert.alert('Success', 'RSVP confirmed!');
    } catch (error) {
      Alert.alert('Error', 'Failed to RSVP');
    }
  };

  const renderCategoryFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={searchText}
        onChangeText={setSearchText}
      />
      
      {renderCategoryFilter()}
      
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', {event: item})}
            onRSVP={() => handleRSVP(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchInput: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    color: '#64748b',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
});

export default EventListScreen;