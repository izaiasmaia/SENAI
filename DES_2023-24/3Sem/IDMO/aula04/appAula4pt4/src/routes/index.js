/**Nosso App.js será responsável por qual rota deverá exibir */


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// import Home from '../pages/Home';
import StackRoutes from './stackRoutes'
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato'

// Navegação tipo pilha, uma página sobre a outra
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
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

        <Tab.Screen
          name='HomeStack'
          component={StackRoutes}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome5 name='home' color={color} size={size} />
            }
          }}
        />

        <Tab.Screen
          name='Sobre'
          component={Sobre}
          options={{
            tabBarLabel:'Sobre',
            tabBarIcon:({color, size})=>{
              return <FontAwesome5 name="file-alt" color={color} size={size}/>
            
            }
          }}
        />

        <Tab.Screen
          name='Contato'
          component={Contato}
          options={{
            tabBarLabel: 'Contato',
            // Retira o Header na tela de contato
            headerShown:false,
            tabBarIcon:({color, size})=>{
              return <FontAwesome5 name="phone-alt" color= {color} size={size}/>;
            }
          }}
        />

      </Tab.Navigator>
  
  )
}
