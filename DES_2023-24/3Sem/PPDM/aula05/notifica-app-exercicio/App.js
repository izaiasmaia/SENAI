
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';

import Notificacoes from './src/pages/Notificacoes';
import DetalhesNotificacao from './src/pages/DetalhesNotificacao';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Notificacoes"
            component={Notificacoes}
            options={{
              title: 'Notificações',
              headerStyle: {
                backgroundColor: '#FCAC17',
              },
              // headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="DetalhesNotificacao"
            component={DetalhesNotificacao}
            options={{
              headerStyle: {
                backgroundColor: '#FCAC17',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  

  );
}

