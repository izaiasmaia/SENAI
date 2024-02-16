import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

import { useNavigation, StackActions } from '@react-navigation/native'


export default function Contato() {

    const navigation = useNavigation();
    

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Página Contato</Text>
            <Button title='Voltar' onPress={() => navigation.goBack()} />
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