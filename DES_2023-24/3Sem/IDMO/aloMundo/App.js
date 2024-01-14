/**Import da biblioteca do status-bar do framework Expo */
import { StatusBar } from 'expo-status-bar';

/**Import dos componentes que estão sendo utilizados do React Native */
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

/**Função principal do aplicativo */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá mundo!</Text>
      <Text>Meu primeiro aplicativo mobile!!!</Text>
      <Button title='Olá mundo' onPress={() => Alert.alert('Seja bem vindo ao meu primeiro aplicativo mobile!')}/>
      <StatusBar style="auto" />
    </View>
  );
}

/**Estilização dos componentes, definimos o estilo para cada componente individual*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


