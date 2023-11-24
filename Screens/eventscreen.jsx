import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const tiposDeEvento = [
  { id: 1, nombre: 'Asefa' },
  { id: 2, nombre: 'Actos' },
  { id: 3, nombre: 'Peula' },
  { id: 4, nombre: 'Evento especial' },
];

const eventosData = [
  { id: 1, nombre: 'Clalit', descripcion: 'Clalit como siempre', fecha: '2023-11-24', tipo: 1},
  { id: 2, nombre: 'Peula', descripcion: 'Sabado de peula normalito', fecha: '2023-11-25', tipo: 3 },
  { id: 3, nombre: 'Iom Hajaver', descripcion: 'Iom hajaver woo', fecha: '2023-11-27', tipo: 4},
  { id: 4, nombre: 'Asefa de Tzevet', descripcion: 'Para armar el nuevo modulo', fecha: '2023-11-28', tipo: 1},
  { id: 5, nombre: 'Peula', descripcion: 'Viernes de peula normalito', fecha: '2023-12-01', tipo: 3 },
  { id: 6, nombre: 'Peula', descripcion: 'Sabado de peula normalito', fecha: '2023-12-02', tipo: 3 },
];

const EventList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.textoBlanco}>ID: {item.id}</Text>
      <Text style={styles.textoBlanco}>Nombre: {item.nombre}</Text>
      <Text style={styles.textoBlanco}>Descripción: {item.descripcion}</Text>
      <Text style={styles.textoBlanco}>Fecha: {item.fecha}</Text>
      <Text style={styles.textoBlanco}>Tipo: {tiposDeEvento.find((tipo) => tipo.id === item.tipo).nombre}</Text>
    </View>
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
  },
  textoBlanco: {
    color: '#fff',
  },
});

export default EventList;
