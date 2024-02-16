<<<<<<< HEAD
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Detalhes() {
    return (
        <SafeAreaView >
            <Text>Detalhes</Text>
        </SafeAreaView>
    )
}
=======
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detalhes() {
    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Tela detalhes do usuário</Text>
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
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
