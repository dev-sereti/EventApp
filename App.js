import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventListScreen from './src/screens/EventListScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';

export type RootStackParamList = {
  EventList: undefined;
  EventDetail: {event: any}; // You can create a proper Event interface
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventList">
        <Stack.Screen 
          name="EventList" 
          component={EventListScreen}
          options={{
            title: 'Tukutane Events',
            headerStyle: {backgroundColor: '#6366f1'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen}
          options={{
            title: 'Event Details',
            headerStyle: {backgroundColor: '#6366f1'},
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;