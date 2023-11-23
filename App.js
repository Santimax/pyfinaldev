import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import Eventscreen from './Screens/eventscreen';
import DetalleEvento from './Screens/DetalleEvento';
import CalendarScreen from './Screens/CalendarScreen'
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Eventos" component={Eventscreen} />
        <Stack.Screen name="Detalles" component={DetalleEvento} />
        <Stack.Screen name="Calendario" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//CalendarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c2691',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
