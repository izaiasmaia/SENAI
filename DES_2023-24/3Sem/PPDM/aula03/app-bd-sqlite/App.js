import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from './src/database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection; // 



export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  /**
   * Função dentro do useEffect que cria a tabela caso ela não exista
   */
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)',
        [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
        () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
        // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
        (_, error) => console.error(error) //retorno de  erro
      );
    }, null);
  }, []);

  /**
   * Função utilizada para atualizar os registros
   */
  const atualizaRegistros = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM clientes',
          //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
          [], (_, { rows }) =>
          // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
          setTodos(rows._array),
        );
      });
    } catch (error) {
      console.error('Erro ao buscar todos:', error);
    }
  };

  /**
   * useEffect que chama a função para atualizar os registros
   */
  useEffect(() => {
    atualizaRegistros();
  }, []);

  /**
   * Função utilizada inserir um novo registro
   */
  const incluiCliente = () => {
    if (inputText.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
      return;
    }

    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO clientes (nome) VALUES (?)',
          [inputText],
          (_, { rowsAffected }) => {
            console.log(rowsAffected);
            setInputText('');
            atualizaRegistros();
          },
          (_, error) => {
            console.error('Erro ao adicionar cliente:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao adicionar o cliente.');
          }
        );
      }
    );
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>

          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite um novo cliente"
          />
          <Button title="Adicionar" onPress={incluiCliente} />

          <Text style={styles.title}>Clientes Cadastrados</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerScroll}>
            {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
            {todos.map(cliente => (
              <View key={cliente.id} style={styles.clienteItem}>
                <Text>{cliente.nome}</Text>
                {/* Dentro do onPress do botão, colocamos um alert perguntando ao usuário se deseja excluir o registro selecionado */}
                <Button title="Excluir" onPress={() => {
                  Alert.alert(
                    "Atenção!",
                    'Deseja excluir o registro selecionado?',
                    [
                      {
                        text: 'OK',
                        onPress: () => excluiCliente(cliente.id)
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => { return }
                      }
                    ],
                  )

                }} />
              </View>
            ))}
          </View>
        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}


/**
 * Estilização dos componentes
 */
const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    marginTop: 10
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
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
});


