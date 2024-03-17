import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


import api from '../../services/api/api';

export default function NovoCliente() {
    const [txtNome, setTxtNome] = useState('');
    const [txtIdade, setTxtIdade] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

   
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
                        onPress: () => {
                            hideAlert();
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }, [showAlert]);

    /**
     * * Função que realizada a requisição para inserção do cliente na API
    */
    const SalvarCliente = async (id) => {
        try {
            console.log(txtNome, txtIdade);

            if (txtNome == '' || txtNome == null) {
                setAlertMessage('Preencha corretamente o campo nome!')
                handleShowAlert();
                return;
            }
            if (txtIdade == '' || txtIdade == null) {
                setAlertMessage('Preencha corretamente o campo idade')
                handleShowAlert();
                return;
            }
            if (isNaN(Number(txtIdade))) {
                setAlertMessage("A idade deve ser um número!");
                handleShowAlert()
                return;
            }

            const response = await api.post(`/clientes`, { nome: txtNome.trim(), idade: Number(txtIdade) })
                .catch(function (error) {
                    if (error.response) {
                        // A requisição foi feita e o servidor respondeu com um código de status
                        // que sai do alcance de 2xx
                        console.error(error.response.data);
                        console.error(error.response.status);
                        console.error(error.response.headers);
                    } else if (error.request) {
                        // A requisição foi feita mas nenhuma resposta foi recebida
                        // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
                        // http.ClientRequest no node.js
                        // console.error(error.request);
                        if ((error.request._response).includes('Failed')) {
                            console.error("Erro ao conectar com a API");
                        }

                    } else {
                        // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
                        console.error('Error:', error.message);
                    }


                    console.error(error.config);
                });
            console.log((response));
            if (response != undefined) {
                if (response.data[0].affectedRows == 1) {
                    setAlertMessage('Registro inserido com sucesso!')
                    setTxtNome('');
                    setTxtIdade('');
                    handleShowAlert();
                }
                else {
                    setAlertMessage('Ocorreu um erro ao inserir o registro');
                    handleShowAlert();
                }
            }
            // console.log(cliente);
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Renderiza os componetes na tela do dispositivo
     */
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: '80%' }}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>Preencha os campos abaixo:</Text>
                </View>

                <Text>Nome do cliente:</Text>
                <TextInput style={[styles.inputText, { width: '100%' }]} value={txtNome} onChangeText={setTxtNome} ></TextInput>


                <Text>Idade do cliente:</Text>
                <TextInput style={[styles.inputText, { width: '20%' }]} value={txtIdade} onChangeText={setTxtIdade}  ></TextInput>
            </View>

            <TouchableOpacity
                onPress={() => {
                    SalvarCliente()
                }}
                style={[styles.alignVH, { width: '80%', height: 40, borderColor: 'black', backgroundColor: 'blue', borderRadius: 4 }]}>
                <Text style={{ color: 'white' }}>Salvar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //   justifyContent: 'center',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5
    },
    alignLeft: {

        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'auto',
        paddingLeft: 45
    },
    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});