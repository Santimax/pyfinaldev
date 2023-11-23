import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Platform, DatePickerIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker as RNPicker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const tiposDeEvento = [
  { id: 1, nombre: 'Asefa' },
  { id: 2, nombre: 'Actos' },
  { id: 3, nombre: 'Peula' },
  { id: 4, nombre: 'Evento Especial' },
];

const dataInicial = [
  { id: '1', nombre: 'Evento 1', fecha: '2023-11-23 08:00', descripcion: 'Descripción del evento 1', tipoEvento: 1 },
  { id: '2', nombre: 'Evento 2', fecha: '2023-11-24 12:30', descripcion: 'Descripción del evento 2', tipoEvento: 2 },
  { id: '3', nombre: 'Evento 3', fecha: '2023-11-25 18:45', descripcion: 'Descripción del evento 3', tipoEvento: 3 },
  { id: '4', nombre: 'Evento 4', fecha: '2023-11-26 20:15', descripcion: 'Descripción del evento 4', tipoEvento: 4 },
  // Agrega más elementos según sea necesario
];

const ListItem = ({ id, nombre, fecha, descripcion, tipoEvento }) => (
  <View style={styles.listItem}>
    <Ionicons name="ios-arrow-forward" size={24} color="black" />
    <View style={styles.itemContent}>
      <Text style={styles.itemText}>{`ID: ${id}`}</Text>
      <Text style={styles.itemText}>{`Nombre: ${nombre}`}</Text>
      <Text style={styles.itemText}>{`Fecha: ${fecha}`}</Text>
      <Text style={styles.itemText}>{`Descripción: ${descripcion}`}</Text>
      <Text style={styles.itemText}>{`Tipo de Evento: ${getTipoEventoNombre(tipoEvento)}`}</Text>
    </View>
  </View>
);

const getTipoEventoNombre = (tipoEventoId) => {
  const tipoEvento = tiposDeEvento.find((tipo) => tipo.id === tipoEventoId);
  return tipoEvento ? tipoEvento.nombre : '';
};

const App = () => {
  const [eventos, setEventos] = useState(dataInicial);
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    descripcion: '',
    tipoEvento: 1,
    fecha: new Date(),
    showTimePicker: false,
  });

  const handleAgregarEvento = () => {
    setEventos((prevEventos) => [
      ...prevEventos,
      {
        id: (prevEventos.length + 1).toString(),
        ...nuevoEvento,
        fecha: nuevoEvento.fecha.toLocaleString(),
      },
    ]);
    setNuevoEvento({
      nombre: '',
      descripcion: '',
      tipoEvento: 1,
      fecha: new Date(),
      showTimePicker: false,
    });
  };

  const showDatePicker = () => {
    setNuevoEvento({ ...nuevoEvento, showTimePicker: true });
  };

  const handleDatePickerChange = (event, selectedDate) => {
    setNuevoEvento({
      ...nuevoEvento,
      showTimePicker: Platform.OS === 'ios' ? true : false,
      fecha: selectedDate || nuevoEvento.fecha,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.agregarEventoContainer}>
        <Text style={styles.titulo}>Agregar Nuevo Evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nuevoEvento.nombre}
          onChangeText={(text) => setNuevoEvento({ ...nuevoEvento, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={nuevoEvento.descripcion}
          onChangeText={(text) => setNuevoEvento({ ...nuevoEvento, descripcion: text })}
        />
        <View style={styles.pickerContainer}>
          <Text>Tipo de Evento: </Text>
          {Platform.OS === 'android' ? (
            <RNPicker
              selectedValue={nuevoEvento.tipoEvento}
              onValueChange={(value) => setNuevoEvento({ ...nuevoEvento, tipoEvento: value })}
            >
              {tiposDeEvento.map((tipo) => (
                <RNPicker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
              ))}
            </RNPicker>
          ) : (
            <RNPicker
              selectedValue={nuevoEvento.tipoEvento}
              onValueChange={(value) => setNuevoEvento({ ...nuevoEvento, tipoEvento: value })}
            >
              {tiposDeEvento.map((tipo) => (
                <RNPicker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
              ))}
            </RNPicker>
          )}
        </View>
        <View style={styles.fechaContainer}>
          <Text>Fecha y Hora: </Text>
          {Platform.OS === 'ios' && nuevoEvento.showTimePicker && (
            <DatePickerIOS
              date={nuevoEvento.fecha}
              onDateChange={(date) => setNuevoEvento({ ...nuevoEvento, fecha: date })}
              mode="time"
            />
          )}
          {Platform.OS === 'android' && nuevoEvento.showTimePicker && (
            <DateTimePicker
              value={nuevoEvento.fecha}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDatePickerChange}
            />
          )}
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          {Platform.OS === 'android' && (
            <Button title="Seleccionar Hora" onPress={() => setNuevoEvento({ ...nuevoEvento, showTimePicker: true })} />
          )}
        </View>
        <Button title="Agregar Evento" onPress={handleAgregarEvento} />
      </View>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  agregarEventoContainer: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fechaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    marginLeft: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default App;
