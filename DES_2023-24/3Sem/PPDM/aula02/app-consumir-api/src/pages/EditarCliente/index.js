import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


import api from '../../services/api/api';

export default function EditarCliente() {
    const navigation = useNavigation();
    const route = useRoute();

    const [txtNome, setTxtNome] = useState(route.params?.nome);
    const [txtIdade, setTxtIdade] = useState(route.params?.idade);
    const [txtId, setTxtId] = useState(route.params?.id);


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    function navegaTodosClientes() {
        navigation.navigate("TodosClientes", { setRefresh: true });
    }

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
                            navegaTodosClientes();
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }, [showAlert]);

    /**
     * * Função que realizada a requisição para edição do cliente na API
    */
    const editarCliente = async (id) => {
        try {
            // console.log(txtNome, txtIdade);

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

            const response = await api.put(`/clientes/${txtId}`, { nome: txtNome.trim(), idade: Number(txtIdade) })
                .catch(function (error) {
                    if (error.response) {
                        console.error(error.response.data);
                        console.error(error.response.status);
                        console.error(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.error("Erro ao conectar com a API");
                        }

                    } else {
                        console.error('Error:', error.message);
                    }
                    console.error(error.config);
                });
            console.log((response));
            if (response != undefined) {
                if (response.data[0].changedRows == 1) {

                    setAlertMessage('Registro alterado com sucesso!')
                    setTxtId('');
                    setTxtNome('');
                    setTxtIdade('');
                    handleShowAlert();
                    navigation.navigate('TodosClientes', { status: true });
                }
                else if (response.data[0].info == 'Rows matched: 1  Changed: 0  Warnings: 0') {
                    setAlertMessage('Nenhuma alteração foi detectada, registro não alterado!');
                    handleShowAlert();
                }
            }
            else {
                setAlertMessage('Ocorreu um erro ao atualizar o registro, tente novamente!');
                handleShowAlert();
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

                <Text>ID:</Text>
                <TextInput style={[styles.inputText, { width: '20%', fontWeight: 'bold' }]} value={txtId.toString()} onChangeText={setTxtId} readOnly></TextInput>

                <Text>Nome do cliente:</Text>
                <TextInput style={[styles.inputText, { width: '100%' }]} value={txtNome} onChangeText={setTxtNome} ></TextInput>

                <Text>Idade do cliente:</Text>
                <TextInput style={[styles.inputText, { width: '20%' }]} value={txtIdade.toString()} onChangeText={setTxtIdade}  ></TextInput>
            </View>

            <TouchableOpacity
                onPress={() => {
                    editarCliente();
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