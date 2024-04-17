# Aula03 - Desenvolvendo app com banco de dados interno async/await

## 1. O que é o SQLite?
- SQLite é um sistema de gerenciamento de banco de dados relacional (SGBD) leve, autônomo, de código aberto e amplamente utilizado.
- Não há necessidade de configuração ou administração de servidor. O SQLite é uma biblioteca de banco de dados que pode ser incorporada diretamente em aplicativos.
- Banco de Dados Embutido: O banco de dados SQLite é armazenado como um único arquivo em disco, tornando-o ideal para aplicativos que exigem portabilidade e facilidade de backup.
- Tipos de Dados: Suporta vários tipos de dados, incluindo INTEGER, REAL, TEXT, BLOB e NULL. Os tipos de dados são dinâmicos, permitindo que você armazene diferentes tipos de dados em uma mesma coluna.
- Compatibilidade: O SQLite é amplamente compatível com muitas linguagens de programação, incluindo C/C++, Python, Java, JavaScript (por meio de bibliotecas como SQLite.js), entre outras.
- Tamanho Compacto: A biblioteca SQLite é extremamente compacta, ocupando poucos recursos de sistema, o que a torna adequada para aplicativos de dispositivos móveis e embarcados.

## 2. Utilizar banco de dados interno: SQLite.
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da disciplina, **PPDM**:
- Criar uma pasta com o nome **aula03**
- Dentro da pasta **aula03** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-bd-sqlite`
- Comando para iniciar o projeto:
    - `npx expo start`

### 2.2. Instalando dependências básicas
- Instalar as dependências básicas:
    - `npm install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`   
  
- Instalar a dependência do React Navigation Stack:
    - `npm install @react-navigation/native-stack`
  
- Instalar o SqLite, componente de base de dados local:
    - `npx expo install expo-sqlite`
  
- Instalar o pacote abaixo como alternativa de lidar com áreas seguras:
    - `npm install react-native-safe-area-context`
  
- Instalar componente status bar height, utilizado para obter a altura do status bar:
    - `npm install --save react-native-status-bar-height`

- Instalar o componente picker-select para utilizar na seleção de itens pré-definidos:
    - `npm install react-native-picker-select`

- Instalar o componente expo-linear-gradient para criar cores gradiente em componentes:
    - `expo install expo-linear-gradient`


``` Javascript

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection; 

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [operacao, setOperacao] = useState('Incluir');
  const [id, setId] = useState(null);

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
  const salvaCliente = () => {
    if (inputText.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
      return;
    }
    if (operacao === 'Incluir') {
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
    } else if (operacao === 'Editar') {
      db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE clientes SET nome=? WHERE id=?',
            [inputText, id],
            (_, { rowsAffected }) => {
              console.log(rowsAffected);
              setInputText('');
              atualizaRegistros();
              setOperacao('Incluir')
              Alert.alert('Sucesso', 'Registro alterado com sucesso.')
            },
            (_, error) => {
              console.error('Erro ao editar cliente:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao editar o cliente.');
            }
          );
        }
      );
    }
  };

  /**
   * Função utilizada atualizar um registro
   */
  const handleButtonPress = (nomeCLi) => {
    // Aqui você pode definir o texto que deseja adicionar ao TextInput
    setInputText(nomeCLi);
  };

  /**
   * Função utilizada para excluir um registro
   */
  const excluiCliente = id => {
    db.transaction(
      tx => {
        tx.executeSql(
          'DELETE FROM clientes WHERE id = ?',
          [id], (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              atualizaRegistros(); // Atualiza a lista de todos
              Alert.alert('Sucesso', 'Registro excluído com sucesso.');
            } else {
              Alert.alert('Erro', 'Nenhum registro foi excluído, vertifique e tente novamente!');
            }
          },
          (_, error) => {
            console.error('Erro ao excluir cliente:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o cliente.');
          }
        );
      }
    );
  };

  /**
   * Função utilizada para deletar as tabelas e a base de dados
   */
  const deleteDatabase = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
          [],
          (_, { rows }) => {
            rows._array.forEach(table => {
              tx.executeSql(
                `DROP TABLE IF EXISTS ${table.name}`,
                [],
                () => {
                  console.log(`Tabela ${table.name} excluída com sucesso`);
                  setTodos([]);
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

          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite um novo cliente"
          />
          <Button title="Adicionar" onPress={salvaCliente} />
          <Button title="Excluir Banco de dados" onPress={() => {
            Alert.alert(
              "Atenção!",
              'Deseja excluir o banco de dados? Todos os registros serão perdidos. Esta ação não pode ser desfeita!',
              [
                {
                  text: 'OK',
                  onPress: () => deleteDatabase
                },
                {
                  text: 'Cancelar',
                  onPress: () => { return }
                }
              ],
            )

          }} />

          <Text style={styles.title}>Clientes Cadastrados</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.containerScroll}>
            {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
            {todos.map(cliente => (
              <View key={cliente.id} style={styles.clienteItem}>
                <Text>{cliente.id}</Text>
                <Text>{cliente.nome}</Text>
                {/* Dentro do onPress do botão, colocamos um alert perguntando ao usuário se deseja excluir o registro selecionado */}
                <View style={styles.buttonTable}>
                  <TouchableOpacity onPress={() => {
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
                          onPress: () => { return },
                          style: 'cancel',
                        }
                      ],
                    )
                  }}>
                    <FontAwesome6 name='trash-can' color={'red'} size={24} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { handleButtonPress(cliente.nome), setOperacao('Editar'), setId(cliente.id) }}>
                    <FontAwesome6 name='pen-to-square' color={'silver'} size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>


      </SafeAreaView>
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




```

