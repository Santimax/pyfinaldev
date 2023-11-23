import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import añadirEventos from './AñadirEvento';

const EventosScreen = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigationHook = useNavigation();
    const navigation = useNavigation();    
    const Click = () => {    
        console.log('boton');
        navigationHook.navigate('Detalles')  
    };

    const baseURL = 'http://A-PHZ2-AMI-003:3000/API/eventos';
    //A-PHZ2-AMI-004
    //a-phz2-cidi-045
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}`);
            setData(response.data);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        console.log('boton');
        navigationHook.navigate('Detalles');
    };

    const renderItem = ({ item }) => (
        console.log(item),
        <View
        style={{
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
            backgroundColor: '#c21104',
        }}>
        <Text style={{ fontSize: 18 }}>{item.idEvento}</Text>
        <Text style={{ fontSize: 14 }}>{item.nombreEvento}</Text>
        <Button title="Detalles" onPress={handleClick} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {loading && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
            </View>
        )}

        {!loading && !error && (
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.idEvento.toString()}
            />
        )}
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.idEvento.toString()}
            />
        <Button title="Más detalles" onPress={Click}/>
        </SafeAreaView>
    );
    };

export default EventosScreen;
//https://github.com/jeesssik/PokeContext
