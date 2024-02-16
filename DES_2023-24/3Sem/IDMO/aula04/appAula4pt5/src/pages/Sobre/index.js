import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useRoute, useNavigation } from "@react-navigation/native";

// Mostrar que essas propriedades são recebidas por parâmetro

// export default function Sobre({route}) {
//     return (
//         <SafeAreaView style={[styles.container]}>
//             <Text>Tela SOBRE</Text>
//             <Text>Email</Text>
//             <TextInput value={route.params?.email}></TextInput>

//             <Text>Nome</Text>
//             <TextInput value={route.params?.nome}></TextInput>
//         </SafeAreaView>
//     )
// }

export default function Sobre() {
    const route = useRoute();
    const navigation = useNavigation();

    // Exibir essa parte ao final
    // UseCallback para evitar atualizar a função toda vez que o componente for renderizado, função síncrona
    // Manipular título do Header

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: route.params?.nome === '' ? 'Página Sobre': `Seja bem vindo, ${route.params?.nome}`

    //     })
    //     //Navigation utilidado como dependência do useLayoutEffect
    // }, [navigation])

    const navegaContato = () => {
        // Passando informações entre páginas, da página Home para Sobre
        navigation.navigate('Contato', { nome: 'Izaias', email: 'izaias@teste.com' });
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Tela SOBRE</Text>
            <Text>Email</Text>
            <TextInput value={route.params?.email}></TextInput>

            <Text>Nome</Text>
            <TextInput value={route.params?.nome}></TextInput>
            <Button title='Tela de contatos' onPress={navegaContato} />
            <Button title='Voltar'  onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})