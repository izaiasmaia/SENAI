import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaID = () => {
        navigation.navigate('DetalhesCliente');
    }

    const navegaNovoCliente = () => {
        navigation.navigate('NovoCliente');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Seja bem vindo!</Text>
            <Button title='Abrir pesquisa por ID' onPress={navegaPesquisaID} />
            <Button title='Abrir cadastro cliente' onPress={navegaNovoCliente}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
});
