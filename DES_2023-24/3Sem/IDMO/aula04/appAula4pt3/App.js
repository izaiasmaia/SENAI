/**Nosso App.js será responsável por qual rota deverá exibir */

import { Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


import Home from './src/pages/Home';
import Sobre from './src/pages/Sobre';
import Contato from './src/pages/Contato'

// Navegação tipo pilha, uma página sobre a outra
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#ff1493'
          }
        

        }}>

        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Tela Inicial',
            // alterando o estilo do Header
            headerStyle: {
              backgroundColor: '#ff1493'
            },
            // alterando a cor do texto do Header
            headerTintColor: '#fff',
            

            // Retirar o Header, tela de Login, tela inicial geralmente não tem
            // headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='home' color={color} size={size}></FontAwesome5>
            },
            // tabBarStyle:{
            //   backgroundColor:'black'
            // }

          }}
        />
        <Tab.Screen
          name='Sobre'
          component={Sobre}
          options={{
            title: 'Página Sobre',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='file-alt' color={color} size={size}></FontAwesome5>
            },
          }}
        />

        <Tab.Screen
          name='Contato'
          component={Contato}
          options={{
            title: 'Formulário de Contato',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='phone-alt' color={color} size={size}></FontAwesome5>
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
