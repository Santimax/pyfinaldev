import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../Cosas varias/loguito';

// Array de noticias
const noticiasData = [
  {
    id: 1,
    titulo: 'Título de la Noticia 1',
    descripcion: 'Descripción corta de la Noticia 1',
    imagen: 'URL_DE_LA_IMAGEN_1',
  },
  {
    id: 2,
    titulo: 'Título de la Noticia 2',
    descripcion: 'Descripción corta de la Noticia 2',
    imagen: 'URL_DE_LA_IMAGEN_2',
  },
  // ... más noticias
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleVerNoticia = (noticia) => {
    // Puedes navegar a la pantalla de detalles de la noticia con la información de la noticia
    navigation.navigate('DetalleNoticia', { noticia });
  };

  // Función para renderizar cada elemento de la lista de noticias
  const renderNoticiaItem = ({ item }) => (
    <TouchableOpacity style={styles.noticiaItem} onPress={() => handleVerNoticia(item)}>
      <Image source={{ uri: item.imagen }} style={styles.noticiaImagen} />
      <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
      <Text style={styles.noticiaDescripcion}>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>H D O</Text>
      <Text style={styles.subtitle}>Bienvenidos a nuestra aplicación</Text>
      <FlatList
        data={noticiasData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNoticiaItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0023bf',
  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    marginVertical: 10,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 20,
    marginVertical: 10,
  },
  noticiaItem: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 300,
  },
  noticiaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  noticiaDescripcion: {
    fontSize: 16,
  },
  noticiaImagen: {
    width: 300,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default HomeScreen;
