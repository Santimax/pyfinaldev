import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, Button } from 'react-native';
//import Axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Logo from '../Cosas varias/loguito';

const HomeScreen = () =>{
    const navigationHook = useNavigation();    
    const handleClick = () => {    
        console.log('boton');
        navigationHook.navigate('Eventos')  
    };
    const navigation = useNavigation();    
    const Click = () => {    
        console.log('boton');
        navigationHook.navigate('Calendario')  
    };
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#0023bf'}}>
        <Logo/>
        <Text>  </Text>
        <Text style={{color: '#ffffff', fontSize: 35}}>H D O</Text>
        <Text> </Text>
        <Button title="Eventos" onPress={handleClick}/>
        <Text> </Text>
        <Button title="Calendario" onPress={Click}/>
        </View>
    );
}
export default HomeScreen

//https://stackoverflow.com/questions/61091258/fetching-data-with-axios-and-rendering-flatlist  