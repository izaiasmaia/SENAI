/**Nosso App.js será responsável por qual rota deverá exibir */

import {Button} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Home from './src/pages/Home';
import Sobre from './src/pages/Sobre';
import Contato from './src/Contato'

// Navegação tipo pilha, uma página sobre a outra
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
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
            headerShown: false,
             

          }}
        />
        <Stack.Screen
          name='Sobre'
          component={Sobre}
          options={{
            title: 'Página Sobre',
          }}
        />

        <Stack.Screen
          name='Contato'
          component={Contato}
          options={{
            title: 'Formulário de Contato',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
