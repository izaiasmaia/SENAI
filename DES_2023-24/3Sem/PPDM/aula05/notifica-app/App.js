import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoToken, setExpoToken] = useState('');
  //Referencia para quando a notificação chegar
  const notificationReceivedRef = useRef();
  //Referencia para quando a notificação for clicada
  const notificationResponseRef = useRef();



  // Useefect chama função que verifica se o usuário possui permissão para receber notificações
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoToken(token));

    //Criar referencia para manipular as notificações, para criar essas referência utilizamos o useRef
    notificationReceivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notificação recebida: ', notification);
   

    });
    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log('notificação clicada: ', notification);
   
    });

  }, []);

  // Função que verifica se o usuário possui permissão para receber notificações
  async function handleNotficationLocal() {
    console.log(expoToken);
    schedulePushNotification();
  };

  return (
    <View style={styles.container}>
      <Text>Trabalhando com notificações no Expo!</Text>
      <Button
        title="Enviar notificação local"
        onPress={async () => {
          await handleNotficationLocal();
        }}
      />
      <Text>{expoToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificação local ⏱️",
      body: 'Este é um teste de notificação local com temporizador, exibida após o tempo determinado',
    },
    trigger: null,
    // trigger: { seconds: 5 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Você não possui permissão para receber notificações!');
    return;
  }

  //retorna token local usuário, para isso é necessário a criação de conta no Expo para obtenção do id do projeto
  token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e30529cd-e64f-40c4-9c08-9d5f4073471a' })).data;

  // console.log(token);
  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
