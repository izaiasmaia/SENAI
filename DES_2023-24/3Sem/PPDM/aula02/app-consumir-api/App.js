import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/pages/Home';
import DetalhesCliente from './src/pages/DetalhesCliente';
import NovoCliente from './src/pages/NovoCliente';
import TodosClientes from './src/pages/TodosClientes';
import EditarCliente from './src/pages/EditarCliente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown:false
            }}
          />
          <Stack.Screen
            name='DetalhesCliente'
            component={DetalhesCliente}
            options={{
              title: 'Detalhes do Cliente',
            }}
          />
          <Stack.Screen
            name='NovoCliente'
            component={NovoCliente}
            options={{
              title: 'Novo Cliente',
            }}
          />

          <Stack.Screen
            name="TodosClientes"
            component={TodosClientes}
            options={{
              title: 'Lista de Clientes',
              // headerLeft: () => (
              //   <View style={{ paddingHorizontal: 20 }}><Text>Ícone</Text></View>
              // )
            }}
          />

          <Stack.Screen
            name="EditarCliente"
            component={EditarCliente}
            options={{
              title: 'Editar Cliente',
              // headerLeft: () => (
              //   <View style={{ paddingHorizontal: 20 }}><Text>Ícone</Text></View>
              // )
            }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  alignVH: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
