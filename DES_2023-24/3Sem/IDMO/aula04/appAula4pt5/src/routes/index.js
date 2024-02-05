/**Nosso App.js será responsável por qual rota deverá exibir */

import { Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


import StackRoutes from './stackRoutes';
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='HomeStack'
        component={StackRoutes}
      />
      <Drawer.Screen
        name='Sobre'
        component={Sobre}
      />
      <Drawer.Screen
        name='Contato'
        component={Contato}
      />
    </Drawer.Navigator>
  )
}
