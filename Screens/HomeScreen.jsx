import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, Button } from 'react-native';
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
    const navigate = useNavigation();    
    const Clicker = () => {    
        console.log('boton');
        navigationHook.navigate('Janij')  
    };
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#0023bf'}}>
        <Logo/>
        <Text>  </Text>
        <Text style={{color: '#ffffff', fontSize: 35}}>H D O</Text>
        <Text> </Text>
        <Text style={{color: '#ffffff', fontSize: 20}}>Bienvenidos a nuestra aplicacion</Text>
        <Text>  </Text>
        <Button title="Eventos" onPress={handleClick}/>
        <Text> </Text>
        <Button title="Calendario" onPress={Click}/>
        <Text> </Text>
        <Button title="Janij" onPress={Clicker}/>
        </View>
    );
}
export default HomeScreen
