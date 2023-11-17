import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList, SafeAreaView,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-web';
import axios from 'axios';

    const EventosScreen = () => {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const navigationHook = useNavigation();    
        const handleClick = () => {    
        console.log('boton');
        navigationHook.navigate('Detalles') 
    };
    
    const baseURL = 'http://a-phz2-cidi-045:3000/API/eventos';

        useEffect(() => {
            const fetchData = async () => {
            try {
            const response = await axios.get(`${baseURL}`,);
            setData(response.data);
            setLoading(false);
            } catch (e) {
            setError(e);
            setLoading(false);
        }
        
        };
        fetchData();
        }, []);
        if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
            </View>
        );
        }

        if (error) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>An error occurred</Text>
            </View>
        );
        }

        const renderItem = ({item}) => {
            return (
                <View
                style={{
                padding: 10,
                marginVertical: 8,
                marginHorizontal: 16,
                backgroundColor: '#c21104',
            }}>
            <Text style={{fontSize: 18}}>{item.idEvento}</Text>
            <Text style={{fontSize: 14}}>{item.nombreEvento}</Text>
            <Button title="Detalles" onPress={handleClick}/>
            </View>
        );
    };

        return (
        <SafeAreaView
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
        );
    };


    export default EventosScreen;