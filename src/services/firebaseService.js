import firestore from '@react-native-firebase/firestore';

export class FirebaseService {
  static async getEvents() {
    try {
      const eventsCollection = await firestore().collection('events').get();
      return eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  static async getEventsByCategory(category) {
    try {
      const eventsCollection = await firestore()
        .collection('events')
        .where('category', '==', category)
        .get();
      return eventsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching events by category:', error);
      throw error;
    }
  }

  static async rsvpToEvent(eventId, userId) {
    try {
      await firestore()
        .collection('events')
        .doc(eventId)
        .collection('rsvps')
        .doc(userId)
        .set({
          userId,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      throw error;
    }
  }
}