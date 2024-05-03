import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Platform, Linking } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as HandleNotification from '../../Components/HandleNotification';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const Stack = createNativeStackNavigator();

// Manipulando as notificações utilizando o método
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, //Define se a notificação deve exibir um alerta visual.
        shouldPlaySound: true, //Define se um som deve ser reproduzido quando a notificação for recebida.
        shouldSetBadge: true, //Define se um indicador de badge (por exemplo, no ícone do aplicativo) deve ser exibido quando a notificação for recebida.
    }),
});

export default function Home() {
    const [expoToken, setExpoToken] = useState('');
    const [notificationReceived, setNotificationReceived] = useState(null);
    const [notificationResponse, setNotificationResponse] = useState(null);
    const [allNotifications, setAllNotifications] = useState({ data: [] });


    // //Referencia para quando a notificação chegar
    const notificationReceivedRef = useRef();
    // //Referencia para quando a notificação for clicada
    const notificationResponseRef = useRef();

    const navigation = useNavigation();

    const visualizarNotif = () => {
        navigation.navigate('Notificacoes', { itens: allNotifications })
    }

    // Useefect chama função que verifica se o usuário possui permissão para receber notificações
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoToken(token));

        // Criar referencia para manipular as notificações, para criar essas referência utilizamos o useRef
        notificationReceivedRef.current = HandleNotification.notifRecRef(notification => {
            // console.log('notificação recebida xxx:', notification);
            setNotificationReceived(notification);
        });

        notificationResponseRef.current = HandleNotification.notifRecRes(notification => {
            // console.log('notificação recebida xxx:', notification);
            setNotificationResponse(notification);
        });

    }, []);

    useEffect(() => {

        // console.log('weqeqwe', notificationReceived);
        if (notificationReceived != null) {
            console.log('weqeqwe', notificationReceived);

            // Desestrutura o objeto recebido do 'notificationReceived' para pegar os dados que serão utilizados
            const { date, request: { content, identifier } } = notificationReceived;

            // console.log(content);

            // Pega as variáveis desestruturadas no passo anterior selecionando os itens necessários criando um novo objeto
            const dados = { id: identifier, date: new Date(date).toLocaleString().replace(',', ' '), bodyMessage: content.body, titleMessage: content.title }

            /*
                Incrementa no estado 'allNotifications' o objeto 'dados'.
                'setAllNotifications(prevState => ...)': função que atualiza o estado 'allNotifications'. 
            */
            setAllNotifications(prevState => ({ //prevState representa o estado anterior de 'allNotifications'.
                ...prevState, //Isso é um spread operator. Ele cria uma cópia superficial do objeto prevState
                data: [...prevState.data, dados] //atualizando a propriedade data do estado 'allNotifications', data é um array, e estamos adicionando um novo item a esse array. 
            })); //O '...prevState.data' é o spread operator novamente, que cria uma cópia do array data existente, e dados é o novo item que está sendo adicionado.
        }
    }, [notificationReceived]);

    // 'useEffect' executado quando há mudança de estado no 'useState' 'notificationResponse'
    useEffect(() => {
        if (notificationResponse != null) {
            console.log('weqeqwe', notificationResponse);

            // Desestrutura o objeto recebido do 'notificationResponse' para pegar os dados que serão utilizados
            const { notification: { date, request: { content, identifier } } } = notificationResponse;

            // Pega as variáveis desestruturadas no passo anterior selecionando os itens necessários criando um novo objeto
            const dados = { id: identifier, date: new Date(date).toLocaleString().replace(',', ' '), bodyMessage: content.body, titleMessage: content.title }

            // Navega para a screen 'DetalhesNotificacao' enviando os dados do objeto 'dados'
            navigation.navigate('DetalhesNotificacao', {
                data: dados,
            });
        }
    }, [notificationResponse]);


    // useEffect(() => {
    //     if (allNotifications != null) {

    //         // console.log(`All: `, allNotifications);
    //     }
    // }, [allNotifications])

    useEffect(() => {
        if (notificationResponse != null) {
            console.log(notificationResponse);
        }
    }, [notificationResponse])

    // Função que verifica se o usuário possui permissão para receber notificações
    async function handleNotficationLocal() {
        console.log(expoToken);
        schedulePushNotification();
    };

    const handleLinkPress = () => {
        // Aqui você pode definir o URL que deseja abrir
        const url = 'https://expo.dev/notifications';
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
                <FontAwesome6 name='react' size={128} color='#33cfff' />
                <Text style={{ color: '#fff', marginTop:30}}>Enviando notificações com React Native e Expo!</Text>
            </View>
            
            <View style={styles.container2}>

                <TouchableOpacity onPress={async () => { await handleNotficationLocal(); }} style={styles.button}>
                    <Text style={{ fontSize: 20 }}>Enviar notificação local</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => visualizarNotif()} style={styles.button}>
                    <Text style={{ fontSize: 20 }}>Visualizar notificação</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>Token para teste envio de notificações</Text>
                    <TouchableOpacity onPress={handleLinkPress}><Text style={{ color: '#fff', fontWeight: 'bold' }}> Expo Notification Tool:</Text></TouchableOpacity>
                </View>
                <TextInput value={expoToken} />

                {/* <Text>{expoToken}</Text> */}
                <StatusBar style='inverted' />
            </View>
        </SafeAreaView>
    );
}

/**
 * Agenda uma notificação local
 *
 * @returns {Promise<void>}
 */
async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Notificação local ⏱️",
            body: 'Este é um teste de notificação local com temporizador, exibida após o tempo determinado',
        },
        trigger: null, // Quando a notificação é lançada: no caso de 'null' imediatamente, abaixo definimos um tempo específico
        // trigger: { seconds: 5 },
    });
}

/**
 * Solicita permissão para receber notificações
 *
 * @returns {Promise<string>}
 */
export async function registerForPushNotificationsAsync() {
    let token;

    // Solicita permissão para receber notificações
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    // Se não tiver permissão, solicita 
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    // Se não tiver permissão, retorna
    if (finalStatus !== 'granted') {
        alert('Você não possui permissão para receber notificações!');
        return;
    }

    //retorna token local usuário, para isso é necessário a criação de conta no Expo para obtenção do id do projeto
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e30529cd-e64f-40c4-9c08-9d5f4073471a' })).data;

    console.log(token);
    return token;
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: '#151c1f',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 20,
        backgroundColor: '#151c1f',
        paddingTop:30
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        // width: "100%",
        height: 60,
        backgroundColor: "#FCAC17",
        borderRadius: 2,
        elevation: 5,
        shadowOpacity: 1,
        shadowColor: 'black',
        shadowRadius: 10,
        gap: 10,
        padding: 10,
    },
    container2: {
        flex: 2,
        width: '95%',
        // backgroundColor: '#fff',
        padding: 15,
        gap: 10,
        borderRadius: 5,
        // elevation: 5,
        marginTop: 1
    },
    textInput:
    {
        borderColor: 'lightgray', borderWidth: 1, padding: 5, borderRadius: 5
    }
});
