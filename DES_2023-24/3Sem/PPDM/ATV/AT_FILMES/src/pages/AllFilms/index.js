import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, StackActions, useRoute, useFocusEffect } from '@react-navigation/native'
// import { LinearGradient } from 'expo-linear-gradient';

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;
const windowWidth = Dimensions.get('window').width;


export default function AllFilms() {
    const route = useRoute();

    const [todos, setTodos] = useState([]);
    const [textPesquisa, setTextPesquisa] = useState(null);
    const [refresh, setRefresh] = useState(route.params?.refresh ? route.params.setRefresh : false);

    const navigation = useNavigation();

    const newItem = () => {
        navigation.navigate('NewItem');
    }

    useFocusEffect(
        useCallback(() => {
            // console.log(todos.length);
            if (todos.length !== 0) {
                pesquisaRegistros();
            }
        }, [refresh])
    )

    /**
     * Função utilizada para atualizar os registros
     */
    const pesquisaRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM filmes',
                    //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
                    [], (_, { rows }) =>
                    // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
                    // console.log(rows)
                    setTodos(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar todos:', error);
        }
    };

    const filtraRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql("SELECT * FROM filmes where filme like ? OR genero like ? OR classificacao LIKE ?",
                    //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
                    [`${textPesquisa}%`, `${textPesquisa}%`, `${textPesquisa}%`],
                    (_, { rows }) =>

                        // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
                        // console.log(textPesquisa,rows._array),
                        setTodos(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar todos:', error);
        }
    };

    useEffect(() => {
        filtraRegistros();
       
    }, [textPesquisa]);

    /**
     * useEffect que chama a função para atualizar os registros
     */
    useEffect(() => {
        pesquisaRegistros();        
    }, []);



    /**
     * Função utilizada navegar até a tela de atualização de registro
     */
    const handleButtonPress = (dados) => {
        navigation.navigate('EditItem', dados);
        // setTodos([]);
    };

    /**
     * Função utilizada para excluir um registro
     */
    const exclui = id => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'DELETE FROM filmes WHERE id = ?',
                    [id], 
                    (_, { rowsAffected }) => {
                        if (rowsAffected > 0) {
                            pesquisaRegistros(); // Atualiza a lista de todos
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



    return (

        <SafeAreaView style={styles.androidSafeArea}>
            <View>
                <Text style={styles.title}>Filmes Cadastrados</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10 }}>
                <TextInput
                    onChangeText={setTextPesquisa}
                    value={textPesquisa}
                    style={styles.inputSearch}
                    placeholder='Para pesquisar, informe o nome, gênero ou classificação'
                />
            </View>

            <ScrollView contentContainerStyle={styles.containerScroll}>

                {/* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */}
                {todos.map(filme => (
                    <View key={filme.id} style={[styles.containerFilmes]}>
                        <View style={styles.logoFilmes}>
                            <FontAwesome6 name='clapperboard' color={'#7a42f4'} size={72} />
                        </View>
                        <View style={styles.clienteItem}>
                            {/* <Text>Título:</Text> */}
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{filme.filme}</Text>
                            <View style={styles.alinharEmLinha}>
                                <Text style={{ fontWeight: 'bold' }}>Gênero: </Text>
                                <Text>{filme.genero}</Text>
                            </View>

                            <View style={styles.alinharEmLinha}>
                                <Text style={{ fontWeight: 'bold' }}>Classificação: </Text>
                                <Text>{filme.classificacao}</Text>
                            </View>
                            {/* Dentro do onPress do botão, colocamos um alert perguntando ao usuário se deseja excluir o registro selecionado */}
                            <View style={styles.viewButtonTable}>
                                <TouchableOpacity
                                    style={[styles.alinharEmLinha]}
                                    onPress={() => {
                                        Alert.alert(
                                            "Atenção!",
                                            'Deseja excluir o registro selecionado?',
                                            [
                                                {
                                                    text: 'OK',
                                                    onPress: () => exclui(filme.id)
                                                },
                                                {
                                                    text: 'Cancelar',
                                                    onPress: () => { return },
                                                    style: 'cancel',
                                                }
                                            ],
                                        )
                                    }}>
                                    {/* <Text>Excluir</Text> */}
                                    <FontAwesome6 name='trash-can' color={'#f5554a'} size={24} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.alinharEmLinha]}
                                    onPress={() => { handleButtonPress({ filme: filme.filme, genero: filme.genero, classificacao: filme.classificacao, id: filme.id }) }}
                                >
                                    {/* <Text>Editar</Text> */}
                                    <FontAwesome6 name='pen-to-square' color={'#114264'} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

            </ScrollView>

            <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20, position: 'relative', elevation: 5 }}>

                <TouchableOpacity
                    style={[styles.alinharEmLinha, styles.buttonNovoFilme]}
                    onPress={newItem}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>Novo filme</Text>
                    <FontAwesome6 name='plus' color={'#FFF'} size={24} />
                </TouchableOpacity>

            </View>


        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10
    },
    alinharEmLinha: {
        flexDirection: 'row',
        alignContent: "flex-start",
        alignItems: 'center'
    },
    container: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 15,
        gap: 10,
        borderRadius: 10,
        elevation: 5,
        marginTop: 5
    }
    ,
    containerFilmes: {
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        gap: 10,
        borderRadius: 10,
        elevation: 5,
        marginTop: 5
    },
    containerScroll: {
        flexGrow: 1,
        // flex:1,
        width: windowWidth,
        // backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        gap: 15,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    clienteItem: {
        width: "75%",
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: 5,
        gap: 5
    },
    viewButtonTable: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'flex-end',
        marginBottom: -5,
        // marginTop: 10,
        
    },
    buttonTable: {
        // borderWidth: 1,
        // backgroundColor: "#fff",
        // borderColor: "#c4daed",
        borderRadius: 8,
        // padding: 12,
        // justifyContent: 'space-around',
        // alignItems: 'center',
        // width: '40%',
        // elevation: 3

    },
    buttonNovoFilme: {

        // borderWidth: 2,
        // borderColor: '#cc4bbd',
        backgroundColor: '#6397c6',
        // borderColor: "#e1d4fc",
        borderRadius: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        gap: 15,
        elevation: 3

    },
    logoFilmes: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputSearch: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#fafafa",
        fontSize: 16,
        color: "#333",
        textAlign: 'center'
    },


});


