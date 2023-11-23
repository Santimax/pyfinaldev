import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import moment from 'moment';

const añadirEventos = () => {
 const [events, setEvents] = useState([]);
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [isCalendar, setIsCalendar] = useState(false);

 const getCalendarPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status !== 'granted') {
      alert('Please enable the calendar permissions');
      return false;
    }
    return true;
 };

 const fetchEvents = async () => {
    const permission = await getCalendarPermissions();
    if (permission) {
      const calendars = await Calendar.getCalendarsAsync();
      const events = await Calendar.getEventsAsync(calendars[0].id, {
        startDate: moment(selectedDate).subtract(1, 'day').toDate(),
        endDate: moment(selectedDate).add(1, 'day').toDate(),
      });
      setEvents(events.map(event => ({ ...event, startDate: new Date(event.startDate) })));
    }
 };

 useEffect(() => {
    fetchEvents();
 }, [selectedDate]);

 const renderEvents = () => {
    return events.map((event, index) => (
      <View key={index} style={styles.event}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{moment(event.startDate).format('HH:mm')}</Text>
      </View>
    ));
 };

 const onPrevious = () => {
    setSelectedDate(moment(selectedDate).subtract(1, 'day').toDate());
 };

 const onNext = () => {
    setSelectedDate(moment(selectedDate).add(1, 'day').toDate());
 };

 const onCalendar = () => {
    setIsCalendar(!isCalendar);
 };

 return (
    <View style={styles.container}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={onPrevious}>
          <Text style={styles.button}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.button}>{moment(selectedDate).format('dddd, MMMM Do')}</Text>
        <TouchableOpacity onPress={onNext}>
          <Text style={styles.button}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.eventList}>{renderEvents()}</ScrollView>
      <Button title="Toggle Calendar" onPress={onCalendar} />
      {isCalendar && (
        <Calendar.CalendarList
          calendars={Calendar.CALENDAR_TYPE_ALL}
          events={events}
          onDayPress={(day) => { setSelectedDate(day.date); setIsCalendar(false); }}
        />
      )}
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
 },
 calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
 },
 button: {
    fontSize: 24,
 },
 eventList: {
    marginHorizontal: 20,
 },
 event: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
 },
 eventTitle: {
    fontSize: 4
},
});

export default añadirEventos;