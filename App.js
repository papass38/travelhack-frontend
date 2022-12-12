import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import ChatScreen from './screens/ChatScreen';
import ToDoScreen from './screens/ToDoScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        
        if (route.name === 'Accueil') {
          iconName = 'person-circle-outline'
        } else if (route.name === 'Profil') {
          iconName = 'person-circle-outline'
        }else if (route.name === 'Chat') {
          iconName = 'person-circle-outline'
        } else if (route.name) {
          iconName = 'person-circle-outline'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      },

      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
    })}>
      <Tab.Screen name='Accueil' component={HomeScreen} />
      <Tab.Screen name='Chat' component={ChatScreen} />
      <Tab.Screen name='Profil' component={ProfilScreen} />
      <Tab.Screen name='ToDo' component={ToDoScreen} />
      

    </Tab.Navigator>
    
  )
}
 
 export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign in/Sign up" component={WelcomeScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
