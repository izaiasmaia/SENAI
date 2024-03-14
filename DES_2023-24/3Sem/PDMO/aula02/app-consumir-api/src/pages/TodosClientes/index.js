import React, { useEffect, useState, } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect, StackActions } from '@react-navigation/native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import api from '../../services/api/api';

export default function TodosCliente() {

    const navigation = useNavigation();
    const route = useRoute();

    let [flatListItems, setFlatListItems] = useState([]);
    let [status, setStatus] = useState('');

    // const [estado, setEstado] = useState();
    // if (route.params?.status) {
    //     console.log((route.params?.status));
    //     setStatus(route.params?.status);
    // }
    // setEstado(route.params?.status);
    // console.log((estado));

    const navegaEditarCliente = (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, idade: pIdade});
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const buscarClientes = async () => {
        try {
            console.log('cheeegou');
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
                // console.error(error.config);
                // return;
            });
            // console.log((response));
            if (response != undefined) {
                if (response.data.length > 0) {
                    let temp = [];
                    for (let index = 0; index < response.data.length; index++) {
                        temp.push(response.data[index]);
                        // console.log(response.data.length);                       
                    }
                    setFlatListItems(temp);
                }
                else {
                    setAlertMessage('Nenhum registro localizado');
                    handleShowAlert();
                    return;
                }
            }
            // console.log(cliente);
        } catch (error) {
            // console.log(error)
            return;
        }
    }

    // console.log(route.params?.status);

    useEffect(() => {
        buscarClientes();
        setStatus(route.params?.status);
    }, [route.params?.status]);    

    useEffect(() => {
        buscarClientes();
    }, [status]);

    // useFocusEffect(() => {
    //     buscarClientes();
    //     console.log('ufea');
    // });

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

                        }}
                        style={[styles.alignVH, { paddingRight: 30 }]}
                    >
                        {/* <Text style={{ color: 'white' }}>Pressione para Pesquisar</Text> */}
                        <FontAwesome5 name="trash-alt" color='red' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navegaEditarCliente(item.id, item.nome, item.idade);
                            // setFlatListItems([]);
                        }}>
                        {/* <Text style={{ color: 'white' }}>Pressione para Pesquisar</Text> */}
                        <FontAwesome5 name="edit" color='blue' size={24} />
                    </TouchableOpacity>
                </View>
            </View>

        );
    };



    return (

        <View style={{ flex: 1, backgroundColor: 'darkgray' }}>
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