import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import da biblioteca que permite realizar a navegação
import { useNavigation } from "@react-navigation/native";

<<<<<<< HEAD
=======

>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
export default function Home() {

    // Criar a variável que permite a navegação
    const navigation = useNavigation();

    function navegaDetalhes() {
<<<<<<< HEAD
        // Passando informações entre páginas, da página Home para Sobre
=======
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Tela HOME</Text>
<<<<<<< HEAD
            <Button title="Abrir página detalhes" onPress={navegaDetalhes} />
=======
            <Button title="Abrir página Detalhes" onPress={navegaDetalhes} />
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
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