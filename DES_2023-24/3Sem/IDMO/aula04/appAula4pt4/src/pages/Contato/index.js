import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

import { useNavigation, StackActions } from '@react-navigation/native'


export default function Contato() {

    const navigation = useNavigation();
    const voltarHome = () => {
        // navigation.navigate('Home')
        // Esta ação leva você de volta para a primeira tela na pilha, descartando todos os outros
        navigation.dispatch(StackActions.popToTop());
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Página Contato</Text>          
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