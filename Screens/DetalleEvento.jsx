import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList, SafeAreaView,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-web';
import axios from 'axios';
import añadirEventos from './AñadirEvento';
import { useRoute } from '@react-navigation/native';

const DetalleEvento = () => {
    const route = useRoute();
    const { eventId } = route.params;
  useEffect(() => {

    const [evento, setEvento] = useState(null);

    axios.get(`http://a-phz2-cidi-045:3000/API/eventos/${eventId}`)
      .then(response => {
        // Procesa los datos del evento
        setEvento(response.data);
      })
      .catch(error => {
        console.error('Error al recuperar los datos del evento', error);
      });
  }, []);

  if (!evento) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Nombre del Evento: {evento.nombreEvento}</Text>
      <Text>Fecha del Evento: {evento.fechaEvento}</Text>
      <Text>Descripción del Evento: {evento.descripcionEvento}</Text>
      {/* Mostrar otros detalles del evento según sea necesario */}
    </View>
  );
};

export default DetalleEvento;
//const EventosScreen = () => {
//  const [data, setData] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//  const navigationHook = useNavigation();    
//  const handleClick = () => {    
//  console.log('boton');
//  navigationHook.navigate('Detalles') 
//};