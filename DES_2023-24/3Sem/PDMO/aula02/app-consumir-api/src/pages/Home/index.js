import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaClienteId = () => {
        navigation.navigate('DetalhesCliente');
    }
    const inserirNovoCliente = () => {
        navigation.navigate('NovoCliente');
    }
    const listarTodosCiientes = () => {
        navigation.navigate('TodosClientes');
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Tela HOME</Text>
            {/* <Button title="Abrir página Clientes" onPress={navegaTodosClientes} /> */}
            <Button title="Abrir pesquisa por ID" onPress={navegaPesquisaClienteId} />
            <Button title="Inserir novo cliente" onPress={inserirNovoCliente} />
            <Button title="Listar todos os clientes" onPress={listarTodosCiientes} />
        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});