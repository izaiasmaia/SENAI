<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../pages/Home'
import Detalhes from '../pages/Detalhes'

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
            />
            <Stack.Screen
                name='Detalhes'
                component={Detalhes}
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Detail from '../pages/Detalhes';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='Home'
            component={Home}
            />
            <Stack.Screen
            name='Detalhes'
            component={Detail}
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
            />
        </Stack.Navigator>
    )
}