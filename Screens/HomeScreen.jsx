import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Logo from '../Cosas varias/loguito';
import noticiasData from '../Cosas varias/noticiasData';

const HomeScreen = () => {
  const [expandedNoticiaId, setExpandedNoticiaId] = useState(null);
  const handleToggleExpansion = (noticiaId) => {
    setExpandedNoticiaId((prevId) => (prevId === noticiaId ? null : noticiaId));
  };

  const renderNoticiaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noticiaItem}
      onPress={() => handleToggleExpansion(item.id)}
    >
      <Image source={{ uri: item.imagen }} style={styles.noticiaImagen} />
      <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
      <Text style={styles.noticiaDescripcion}>
        {expandedNoticiaId === item.id ? item.texto : item.descripcion}
      </Text>
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
