/**Nosso App.js será responsável por qual rota deverá exibir */

<<<<<<< HEAD
import { Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


import StackRoutes from './stackRoutes';
=======

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// import Home from '../pages/Home';
import StackRoutes from './stackRoutes'
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato'

// Navegação tipo pilha, uma página sobre a outra
<<<<<<< HEAD
const Stack = createNativeStackNavigator();
=======
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
<<<<<<< HEAD
    
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#ff1493'
          }
        

        }}>
=======
    // Retirar Navigation Container
    // <NavigationContainer>
      <Tab.Navigator
      /** Aplicar essa pesonalização por último 
       * Configurações do Tab Navigator
      */
      screenOptions={{
        headerShown: false, // Esconder o cabeçalho das telas
        tabBarActiveTintColor: '#FF0000', // Cor da letra quando ativada
        tabBarInactiveTintColor: '#D3D3D3', // Cor da letra quando desativada
        tabBarHideOnKeyboard:  true, // Oculta a aba ao digitar no celular
        tabBarShowLabel: false, // Mostrar ou não as labels dos ícones
        tabBarBackground:'red',
        tabBarStyle: {
          backgroundColor: '#28262E', // Cor de fundo do Tabs
        },
      }}
      >
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e

        <Tab.Screen
          name='HomeStack'
          component={StackRoutes}
          options={{
<<<<<<< HEAD
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
=======
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='home' color={color} size={size} />
            }
          }}
        />

>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
        <Tab.Screen
          name='Sobre'
          component={Sobre}
          options={{
<<<<<<< HEAD
            title: 'Página Sobre',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='file-alt' color={color} size={size}></FontAwesome5>
            },
=======
            tabBarLabel:'Sobre',
            tabBarIcon:({color, size})=>{
              return <FontAwesome5 name="file-alt" color={color} size={size}/>
            
            }
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
          }}
        />

        <Tab.Screen
          name='Contato'
          component={Contato}
          options={{
<<<<<<< HEAD
            title: 'Formulário de Contato',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='phone-alt' color={color} size={size}></FontAwesome5>
            },
          }}
        />
      </Tab.Navigator>
    
=======
            tabBarLabel: 'Contato',
            // Retira o Header na tela de contato
            headerShown:false,
            tabBarIcon:({color, size})=>{
              return <FontAwesome5 name="phone-alt" color= {color} size={size}/>;
            }
          }}
        />

      </Tab.Navigator>
  
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
  )
}
