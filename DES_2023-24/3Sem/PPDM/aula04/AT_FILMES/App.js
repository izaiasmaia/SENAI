import React from 'react';
import { StyleSheet, Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from "./src/pages/Home";
import NewItem from "./src/pages/NewItem";
import AllFilms from './src/pages/AllFilms';
import EditItem from './src/pages/EditItem';
import Config from './src/pages/Config';

const Stack = createNativeStackNavigator();

// Abra ou crie o banco de dados SQLite


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
              headerShown: false
            }}
          />
          <Stack.Screen
            name='NewItem'
            component={NewItem}
            options={{
              title: 'Novo Filme',
            }}
          />
          <Stack.Screen
            name='AllFilms'
            component={AllFilms}
            options={{
              title: 'Filmes cadastrados',
            }}
          />
          <Stack.Screen
            name='EditItem'
            component={EditItem}
            options={{
              title: 'Editar filme',
            }}
          />

          <Stack.Screen
            name='Config'
            component={Config}
            options={{
              title: 'Configurações',
            }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10
  },
  containerScroll: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    gap: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonTable: {
    flexDirection: 'row',
    gap: 15
  }
});


