import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native'

import AllFilms from '../AllFilms/index';
// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;

export default function EditItem() {
  const route = useRoute();
  const navigation = useNavigation();

  // console.log(route.params);

  const [id, setId] = useState(route.params?.id)
  const [filme, setFilme] = useState(route.params?.filme);
  const [genero, setGenero] = useState(route.params?.genero);
  const [classificacao, setClassificacao] = useState(route.params?.classificacao);



  /**
   * Função utilizada inserir um novo registro
   */
  const salvarRegistro = () => {
    if (filme.trim() === '') {
      Alert.alert('Erro', 'O nome do filme deve ser preenchido');
      return;
    }
    if (genero === null) {
      Alert.alert('Erro', 'Selecione um gênero para o filme');
      return;
    }
    if (classificacao === null) {
      Alert.alert('Erro', 'Selecione uma classificação para o filme');
      return;
    }

    db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE filmes SET filme=?, genero=?, classificacao=? WHERE id=?',
          [filme, genero, classificacao, id],
          (_, { rowsAffected }) => {
            console.log(rowsAffected);
            setFilme('');
            setGenero(null);
            setClassificacao(null);
            Alert.alert('Info', 'Registro alterado com sucesso',
              [
                {
                  onPress: () => {
                    navigation.navigate('AllFilms');
                  }
                }]);

          },
          (_, error) => {
            console.error('Erro ao editar o registro:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao editar o registro.');
          }
        );
      }
    );

  };



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>

          <View style={styles.viewTitle}>
            <Text style={styles.title}>Editar registro</Text>
          </View>

          <TextInput
            style={styles.input}
            value={filme}
            onChangeText={setFilme}
            placeholder="Informe o nome do filme"
          />
          <View style={styles.dropDown}>
            <RNPickerSelect
              placeholder={({ label: 'Selecione um gênero', value: null })}
              onValueChange={(value) => setGenero(value)}
              value={genero}
              items={[
                { label: 'Ação', value: 'Ação' },
                { label: 'Aventura', value: 'Aventura' },
                { label: 'Comédia', value: 'Comédia' },
                { label: 'Drama', value: 'Drama' },
                { label: 'Ficção', value: 'Ficção' },
                { label: 'Suspense', value: 'Suspense' },
                { label: 'Terror', value: 'Terror' },
              ]}
            />
          </View>

          <View style={styles.dropDown}>
            <RNPickerSelect
              placeholder={({ label: 'Selecione uma classificação', value: null })}
              onValueChange={(value) => setClassificacao(value)}
              value={classificacao}
              items={[
                { label: 'Livre', value: 'Livre' },
                { label: '10 anos', value: '+10' },
                { label: '14 anos', value: '+14' },
                { label: '16 anos', value: '+16' },
                { label: '18 anos', value: '+18' },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonSalvar}
            onPress={salvarRegistro}
          >
            <Text style={styles.buttonTitle}>Salvar</Text>
            <FontAwesome6 name='check' size={32} color="#FFF" />
          </TouchableOpacity>
          {/* <Button title="Adicionar" onPress={salvarRegistro} /> */}

        </View>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10,
    borderRadius: 10,
    elevation: 5
  },
  // containerScroll: {
  //     width: '100%',
  //     backgroundColor: '#fff',
  //     padding: 20,
  //     gap: 5
  // },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewTitle: {
    alignItems: 'center',
    alignContent: 'center',
    width: '100%'
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
  dropDown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonSalvar: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    // width: "100%",
    backgroundColor: "#7a42f4",
    borderRadius: 8,
    elevation: 5,
    shadowOpacity: 1,
    shadowColor: 'black',
    shadowRadius: 5,
    gap: 10,
    padding: 10,
  },
  buttonTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },

});


