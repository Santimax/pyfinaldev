import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { Calendar as ExpoCalendar, Permissions } from 'expo';

const CalendarScreen = () => {
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CALENDAR);
      setCalendarPermission(status === 'granted');
      if (status === 'granted') {
        loadCalendarEvents();
      }
    })();
  }, []);

  const loadCalendarEvents = async () => {
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
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEvent = (event) => (
    <TouchableOpacity key={event.id} style={styles.eventContainer}>
      <Text>{event.title}</Text>
      <Text>{event.startDate.split('T')[1]}</Text>
    </TouchableOpacity>
  );

  const renderEventsForDay = () => {
    const eventsForDay = events[selectedDate] || [];
    return eventsForDay.map(renderEvent);
  };

  return (
    <View style={styles.calendar  }>
      <Text> </Text>
      <Calendar onDayPress={handleDayPress} />
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
  calendar:{
    flex: 1,
    marginTop: 30,
    backgroundColor: '#0023bf'
  },
    eventsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CalendarScreen;
