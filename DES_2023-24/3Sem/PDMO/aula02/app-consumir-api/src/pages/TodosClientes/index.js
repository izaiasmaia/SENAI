import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import api from '../../services/api/api';

export default function TodosCliente() {

    const navigation = useNavigation();
    const route = useRoute();
    let temp = [];

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    let [flatListItems, setFlatListItems] = useState([]);
    const [refresh, setRefresh] = useState(route.params?.setRefresh ? route.params.setRefresh : false);

    /** Realiza a navegação para a Screen EditarCliente */
    const navegaEditarCliente = (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, idade: pIdade });
    };

    /** Altera o valor de setShowAlert para true */
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    /** Altera o valor de setShowAlert para false */
    const hideAlert = () => {
        setShowAlert(false);
    };

    /**
     * Cria o componente Alert que é renderizado através do useEffect com o parâmetro showAlert
     */
    useEffect(() => {
        if (showAlert) {
            Alert.alert(
                'Atenção!',
                alertMessage,
                [
                    {
                        text: 'OK',
                        onPress: hideAlert
                    }
                ],
                { cancelable: false }
            );
        }
    }, [showAlert]);

    /** 
     * Função que seleciona todos os clientes existentes na base de dados 
    */
    const buscarClientes = async () => {
        try {
            const response = await api.get(`/clientes`).catch(function (error) {
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                    return;
                } else if (error.request) {
                    if ((error.request._response).includes('Failed')) {
                        console.error(error.request._response);
                        return;
                    }

                } else {
                    console.error('Error:', error.message);
                    return;
                }
            });

            if (response != undefined) {
                if (response.data.length > 0) {

                    for (let index = 0; index < response.data.length; index++) {
                        temp.push(response.data[index]);

                    }
                    setFlatListItems(temp);
                    temp = [];
                }
                else {
                    setFlatListItems([]);
                    setAlertMessage('Nenhum registro localizado');
                    handleShowAlert();
                    return;
                }
            }
        } catch (error) {
            return;
        }
    };

    /** Função que exclui o cliente selecionado */
    const excluirCliente = async (id) => {
        try {
            const response = await api.delete(`/clientes/${id}`).catch(function (error) {
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                    return;
                } else if (error.request) {
                    if ((error.request._response).includes('Failed')) {
                        console.error(error.request._response);
                        return;
                    }

                } else {
                    console.error('Error:', error.message);
                    return;
                }

            });

            if (response != undefined) {

                if (response.data[0].affectedRows > 0) {

                    setRefresh(prevState => !prevState);
                    setAlertMessage('Registro excluído com sucesso!');
                }
                else {
                    setAlertMessage('Registro não localizado');
                }
                handleShowAlert();
            }
            // console.log(cliente);
        } catch (error) {
            // console.log(error)
            return;
        }
    }

    /** Realiza a busca dos clientes na base de dados a cada mudança de estado de 'refresh' */
    useFocusEffect(
        useCallback(() => {
            buscarClientes();
        }, [refresh])
    )

    /**
     * 
     * @param {Dados de cada cliente informados na chamada da função} item 
     * @returns Retorna a renderização do componente para cada cliente.
     * Neste componente temos um alert com dois botões, um para realizar a edição de cada item e outro para realizar a exclusão 
     */
    let listItemView = (item) => {
        return (

            <View
                key={item.id}
                style={{ backgroundColor: '#c4f092', marginBottom: 30, padding: 15, borderRadius: 10, shadowColor: 'black', elevation: 8 }}>
                <Text style={styles.textheader}>ID</Text>
                <Text style={styles.textbottom}>{item.id}</Text>

                <Text style={styles.textheader}>Nome</Text>
                <Text style={styles.textbottom}>{item.nome}</Text>

                <Text style={styles.textheader}>Idade</Text>
                <Text style={styles.textbottom}>{item.idade}</Text>

                <View style={[styles.container, styles.alignVH]}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção!',
                                'Deseja realmente excluir esse cliente?',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            excluirCliente(item.id);
                                            // setShowAlert(false)
                                        }
                                    },
                                    {
                                        text: 'Cancelar',
                                        onPress: () => {
                                            return;
                                        }

                                    }
                                ],
                                //Permite clicar fora da áre do alert para fechá-lo;
                                { cancelable: true }
                            )
                        }}
                        style={[styles.alignVH, { paddingRight: 30 }]}
                    >

                        <FontAwesome5 name="trash-alt" color='red' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navegaEditarCliente(item.id, item.nome, item.idade);
                            // setFlatListItems([]);
                        }}>
                        <FontAwesome5 name="edit" color='blue' size={24} />
                    </TouchableOpacity>
                </View>
            </View>

        );
    };
    /**
     * Retorna a renderização dos componentes na tela do dispositivo
     */
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.cardTitle}>
                <Text style={[styles.title, { margin: 20 }]}>Clientes Cadastrados</Text>
            </View>

            <View style={{ flex: 1, marginBottom: 10 }}>
                <FlatList
                    style={{ marginTop: 1 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                // extraData={status}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textheader: {
        color: '#111',
        fontSize: 12,
        fontWeight: '700',

    },
    textbottom: {
        color: '#111',
        fontSize: 18,
    },
    cardTitle: {
        paddingBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});