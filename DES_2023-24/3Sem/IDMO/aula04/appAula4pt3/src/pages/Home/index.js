import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import da biblioteca que permite realizar a navegação
import { useNavigation } from "@react-navigation/native";

export default function Home() {

    // Criar a variável que permite a navegação
    const navigation = useNavigation();

    function navegaSobre() {
        // Passando informações entre páginas, da página Home para Sobre
        navigation.navigate('Sobre', { nome: 'Izaias', email: 'izaias@teste.com' });
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Tela HOME</Text>
            <Button title="Abrir página sobre" onPress={navegaSobre} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})