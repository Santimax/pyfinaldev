import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Calendar as ExpoCalendar, Permissions } from 'expo';
import eventosData from '../Cosas varias/eventosData';

const tiposDeEvento = [
  { id: 1, nombre: 'Asefa' },
  { id: 2, nombre: 'Actos' },
  { id: 3, nombre: 'Peula' },
  { id: 4, nombre: 'Evento especial' },
];

const CalendarScreen = () => {
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const requestCalendarPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    setCalendarPermission(status === 'granted');
    if (status === 'granted') {
      loadCalendarEvents();
    }
  };

  const loadCalendarEvents = async () => {
    try {
      const calendars = await ExpoCalendar.getCalendarsAsync();
      const defaultCalendar = calendars.find((cal) => cal.isPrimary);

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const events = await ExpoCalendar.getEventsAsync(
        [defaultCalendar.id],
        startDate,
        endDate
      );

      const formattedEvents = {};
      events.forEach((event) => {
        const date = event.startDate.split('T')[0];
        if (!formattedEvents[date]) {
          formattedEvents[date] = [];
        }
        formattedEvents[date].push(event);
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error loading calendar events:', error);
    }
  };

  useEffect(() => {
    requestCalendarPermission();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEvent = (event) => {
    console.log('Event Data:', event);
    
    return (
      <TouchableOpacity key={event.id} style={styles.eventContainer}>
        <Text style={styles.textoBlanco}>{event.nombre}</Text>
        <Text style={styles.textoBlanco}>{event.descripcion}</Text>
      </TouchableOpacity>
    );
  };

  const renderEventsForDay = () => {
    const eventsFromCalendar = events[selectedDate] || [];
    
    const eventsFromData = eventosData.filter((event) => event.fecha === selectedDate);

    const allEvents = [...eventsFromCalendar, ...eventsFromData];

    return allEvents.map(renderEvent);
  };

  const markedDates = {};
  eventosData.forEach((event) => {
    markedDates[event.fecha] = { marked: true };
  });

  return (
    <View style={styles.calendar}>
      <Text> </Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
      {selectedDate !== '' && (
        <View style={styles.eventsContainer}>
          <Text style={styles.selectedDateText}>{selectedDate}</Text>
          {renderEventsForDay()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  calendar: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#0023bf',
  },
  eventsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  eventContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textoBlanco: {
    color: 'white',
  },
});

export default CalendarScreen;
