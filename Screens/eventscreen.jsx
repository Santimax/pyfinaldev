import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import eventosData from '../Cosas varias/eventosData';

const tiposDeEvento = [
  { id: 1, nombre: 'Asefa' },
  { id: 2, nombre: 'Actos' },
  { id: 3, nombre: 'Peula' },
  { id: 4, nombre: 'Evento especial' },
];

const EventList = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (eventId) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(eventId)) {
        return prevExpandedItems.filter((id) => id !== eventId);
      } else {
        return [...prevExpandedItems, eventId];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => toggleExpand(item.id)}
    >
      <Text style={styles.textoBlanco}>ID: {item.id}</Text>
      <Text style={styles.textoBlanco}>Nombre: {item.nombre}</Text>
      <Text style={styles.textoBlanco}>Fecha: {item.fecha}</Text>
      {expandedItems.includes(item.id) && (
        <>
          <Text style={styles.textoBlanco}>Tipo: {tiposDeEvento.find((tipo) => tipo.id === item.tipo).nombre}</Text>
          <Text style={styles.textoBlanco}>Descripción: {item.descripcion}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0023bf' }]}>
      <Text style={[styles.titulo, { color: '#fff' }]}>Lista de Eventos</Text>
      <FlatList
        data={eventosData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingVertical: 8,
  },
  textoBlanco: {
    color: '#fff',
  },
});

export default EventList;
