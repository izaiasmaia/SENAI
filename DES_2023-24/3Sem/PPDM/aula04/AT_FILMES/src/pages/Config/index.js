import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native'

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;

export default function Config() {
  const route = useRoute();
  const navigation = useNavigation();

  const [id, setId] = useState(route.params?.id)
  const [filme, setFilme] = useState(route.params?.filme);
  const [genero, setGenero] = useState(route.params?.genero);
  const [classificacao, setClassificacao] = useState(route.params?.classificacao);

  const deleteDatabase = () => {
    console.log('sadasda')
    db.transaction(

      tx => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
          [],
          (_, { rows }) => {
            console.log('Tabelas encontradas:', rows._array);
            rows._array.forEach(table => {
              console.log('Excluindo tabela:', table.name);
              tx.executeSql(
                `DROP TABLE IF EXISTS ${table.name}`,
                [],
                () => {
                  console.log(`Tabela ${table.name} excluída com sucesso`);
                  // setTodos([]);
                },
                (_, error) => {
                  console.error(`Erro ao excluir a tabela ${table.name}:`, error);
                  Alert.alert('Erro', `Ocorreu um erro ao excluir a tabela ${table.name}.`);
                }
              );
            });
          },
          (_, error) => {
            console.error('Erro ao buscar as tabelas:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar as tabelas.');
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
            <Text style={styles.title}>Configurações do Sistema</Text>
          </View>


          <View>
            <View style={styles.viewSection}>
              <Text style={styles.titleSection}>Sobre o sistema: </Text>
              <Text>Sistema destinado ao gerenciamento de títulos de filmes e suas informações.</Text>
              <Text style={styles.titleSection}>Versão do sistema: </Text>
              <Text>v1.0.0</Text>
            </View>
            <View style={styles.viewSection}>
              <Text style={styles.titleSection}>Reset do banco de dados: </Text>
              <Text>Esta funçionalidade realiza a exclusão de todo o banco de dados, ao executar esta ação todos os registros serão apagados permanentemente.</Text>
              <TouchableOpacity
                style={styles.buttonSalvar}
                onPress={() => {
                  Alert.alert(
                    "Atenção!",
                    'Deseja excluir o banco de dados? Todos os registros serão perdidos. Esta ação não pode ser desfeita!',
                    [
                      {
                        text: 'OK',
                        onPress: () => deleteDatabase()
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => { return }
                      }
                    ],
                  )

                }}
              >
                <Text style={styles.buttonTitle}>Excluir banco de dados</Text>
                <FontAwesome6 name='check' size={32} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dropDown}>

          </View>


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
    // marginTop: 10
  },
  container: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 15,
    gap: 10,
    borderRadius: 10,
    elevation: 5
  },
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
  titleSection: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  viewSection: {
    gap: 10,
    marginBottom: 15
  },
  buttonSalvar: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    // width: "100%",
    backgroundColor: "#3d85c6",
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


