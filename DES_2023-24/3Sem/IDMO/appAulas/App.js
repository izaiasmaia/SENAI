/** Aula 01: Introdução ao React-Native */

import { StatusBar } from 'expo-status-bar';
/** Import dos componentes que estão sendo utilizados 
 * StyleSheet: permite criar os estilos do nosso app;
 * Text: cria um texto;
 * View: Representa todo o layout do nosso app;
*/
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

/** Função principal do aplicativo */
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá mundo!</Text>
      <Text>Meu primeiro app mobile!!!</Text>
      <Button title='Clique aqui' onPress={() => Alert.alert('Seja bem vindo!')}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

/** Estilização dos componentes, definimos o estilo para cada componente individualmente */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: 'blue',
  }
});
