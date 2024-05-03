import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as HandleNotification from '../../Components/HandleNotification';

const windowWidth = Dimensions.get('window').width;

// Manipulando as notificações utilizando o método
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, //Define se a notificação deve exibir um alerta visual.
    shouldPlaySound: true, //Define se um som deve ser reproduzido quando a notificação for recebida.
    shouldSetBadge: true, //Define se um indicador de badge (por exemplo, no ícone do aplicativo) deve ser exibido quando a notificação for recebida.
  }),
});

export default function Notificacoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const [allNotifications, setAllNotifications] = useState(route.params?.itens);
  const [notificationReceived, setNotificationReceived] = useState(null);
  const [notificationResponse, setNotificationResponse] = useState(null);


  // //Referencia para quando a notificação chegar
  const notificationReceivedRef = useRef();
  // //Referencia para quando a notificação for clicada
  const notificationResponseRef = useRef();

  // console.log('Vamos imprimir: ',allNotifications);

  const handlePress = (dados) => {
    console.log('View pressionada!', dados);
    navigation.navigate('DetalhesNotificacao', {
      data: dados,
    });
  };

  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoToken(token));

    // Criar referencia para manipular as notificações, para criar essas referência utilizamos o useRef
    notificationReceivedRef.current = HandleNotification.notifRecRef(notification => {
      // console.log('notificação recebida xxx:', notification);            
      setNotificationReceived(notification);
    });

    notificationReceivedRef.current = HandleNotification.notifRecRes(notification => {
      // console.log('notificação recebida xxx:', notification);
      setNotificationResponse(notification);
    });

  }, []);

  useEffect(() => {

    // console.log('weqeqwe', notificationReceived);
    if (notificationReceived != null) {
      // console.log('weqeqwe', notificationReceived);

      // Atualizar o estado para adicionar o novo objeto
      const { date, request: { content, identifier } } = notificationReceived;

      // console.log(content);

      // console.log(date, content.body, content.title); 
      dados = { id: identifier, date: new Date(date).toLocaleString().replace(',', ' '), bodyMessage: content.body, titleMessage: content.title }


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

  return (
    <View style={styles.container}>
      <Text>Clique em uma notificação para visualizar o conteúdo:</Text>

      <ScrollView contentContainerStyle={styles.containerScroll}>
        {allNotifications.data.map(notif => (

          /* A propriedade key é usada pelo React para identificar de forma única cada elemento na lista, o que é crucial para que o React possa otimizar a renderização e o desempenho. */
          <Pressable key={notif.id} onPress={() => handlePress(notif)} style={{ width: '95%' }}>
            <View style={[styles.containerFilmes]}>
              <View style={styles.clienteItem}>

                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{notif.titleMessage}</Text>

              </View>
            </View>
          </Pressable>

        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10,
    paddingTop: 20
  },
  containerFilmes: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    gap: 3,
    // borderRadius: 2,
    elevation: 5,
    marginTop: 5
  },
  containerScroll: {
    flexGrow: 1,
    // flex:1,
    width: windowWidth,
    // backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    gap: 5,

  },
});


