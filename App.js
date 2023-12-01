import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen';
import EventList from './Screens/eventscreen';
import CalendarScreen from './Screens/CalendarScreen';
import PeopleList from './Screens/PErsonasScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Eventos') {
              iconName = 'list';
            } else if (route.name === 'Calendario') {
              iconName = 'calendar';
            } else if (route.name === 'Janij') {
              iconName = 'people';
            }

            // Puedes personalizar los iconos aquí según tus necesidades
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Eventos" component={EventList} />
        <Tab.Screen name="Calendario" component={CalendarScreen} />
        <Tab.Screen name="Janij" component={PeopleList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
