import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, StackActions } from '@react-navigation/native'

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;

export default function App() {

    const navigation = useNavigation();

    const config = () => {
        navigation.navigate('Config');
    }
    const allFilms = () => {
        navigation.navigate('AllFilms');
    }

    /**
  * Função dentro do useEffect que cria a tabela caso ela não exista
  */
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, filme TEXT NOT NULL, genero TEXT NOT NULL, classificacao TEXT NOT NULL, data DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW', 'localtime')))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );
        });
    }, []);
    /**
    * Função utilizada para deletar as tabelas e a base de dados
    */



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>

                    <Image
                        source={require('../../../assets/logo-film.jpg')}
                        style={{ width: 300, height: 300 }}
                    />

                    <Text style={styles.title}>Cadastro de Filmes</Text>

                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={newFilm}
                    >
                        <Text style={styles.textButton}>Incluir Filme</Text>
                        <FontAwesome6 name='film' color='white' size={32} />
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={allFilms}
                    >
                        <Text style={styles.textButton}>Acessar</Text>
                    </TouchableOpacity> */}




                    <TouchableOpacity
                        style={styles.button}
                        onPress={allFilms}
                    >
                        <Text style={styles.textButton}>Acessar</Text>
                    </TouchableOpacity>
                </View>




                <View style={styles.alinharEmLinha}>
                    <TouchableOpacity style={styles.buttonConfig} onPress={config}>
                        <FontAwesome6 name='gear' color='#4b2379' size={24} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        gap: 10
    },
    alinharEmLinha: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 15,
    },
    buttonConfig: {

    },
    button: {
        borderRadius: 10,
        backgroundColor: "#873fda",
        height: 60,
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        elevation: 7,
        marginBottom: 30
    },
    textButton: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 26,
        letterSpacing: 6,
        textAlign: 'center',
        color: '#873fda'
    },
    buttonTable: {
        flexDirection: 'row',
        gap: 15
    }
});


