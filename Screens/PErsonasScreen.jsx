import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleList = () => {
  const [people, setPeople] = useState([
    { id: 1, name: 'Santiago', isChecked: false, count: 0 },
    { id: 2, name: 'Leo', isChecked: false, count: 0 },
    { id: 3, name: 'Polshu', isChecked: false, count: 0 },
    { id: 4, name: 'Matias', isChecked: false, count: 0 },
  ]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = async () => {
    try {
      const storedCounters = await AsyncStorage.getItem('counters');
      if (storedCounters) {
        const counters = JSON.parse(storedCounters);
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            counters.find((counter) => counter.id === person.id)
              ? { ...person, count: counters.find((counter) => counter.id === person.id).count }
              : person
          )
        );
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const saveToLocalStorage = async () => {
    try {
      const counters = people.map((person) => ({ id: person.id, count: person.count }));
      await AsyncStorage.setItem('counters', JSON.stringify(counters));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleCheckboxChange = (personId, isChecked) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? { ...person, isChecked, count: isChecked ? person.count + 1 : person.count }
          : person
      )
    );
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [people]);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16, backgroundColor: '#0023bf', paddingVertical: 8 }}>
      <Text style={{ color: 'white', flex: 1 }}>{item.name}</Text>
      <CheckBox
        checked={item.isChecked}
        onPress={() => handleCheckboxChange(item.id, !item.isChecked)}
        containerStyle={{ marginRight: 0, marginLeft: 0 }} // Center the checkbox
      />
      <Text style={{ color: 'white' }}>Asistencia: {item.count}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#0023bf' }}>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PeopleList;
