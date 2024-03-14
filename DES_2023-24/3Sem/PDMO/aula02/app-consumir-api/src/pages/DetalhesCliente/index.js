import React, { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


import api from '../../services/api/api';

export default function App() {
    const [cliente, setCliente] = useState([]);
    const [idCli, setIdCli] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
  
    // useEffect(() => {
    //   // Define um temporizador para fechar o alerta após 3 segundos
    //   if (showAlert) {
    //     const timeout = setTimeout(() => {
    //       setShowAlert(false);
    //     }, 3000);
  
    //     // Limpa o temporizador quando o componente é desmontado ou o estado showAlert é alterado
    //     return () => clearTimeout(timeout);
    //   }
    // }, [showAlert]);
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const getCliente = async (id) => {
      try {
  
        if (id > 0) {
          const response = await api.get(`/clientes/${id}`)
            .catch(function (error) {
              if (error.response) {
                // A requisição foi feita e o servidor respondeu com um código de status
                // que sai do alcance de 2xx
  
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
              } else if (error.request) {
                // A requisição foi feita mas nenhuma resposta foi recebida
                // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
                // http.ClientRequest no node.js
                // console.error(error.request);
                if ((error.request._response).includes('Failed')) {
                  console.error("Erro ao conectar com a API");
                }
  
              } else {
                // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
                console.error('Error:', error.message);
              }
  
  
              console.error(error.config);
            });
          if (response != undefined) {
            if (response.data.length === 0) {
              setCliente([]);
              setAlertMessage('Registro não localizado na base de dados, verifique e tente novamente!')
              handleShowAlert();
            }
            else {
  
              console.log(response.data)
              setCliente(response.data);
            }
          }
          console.log(cliente);
        }
        else {
  
          setCliente([]);
          handleShowAlert();
        }
      } catch (error) {
        console.log(error)
      }
  
    }
  
  
    return (
      <SafeAreaView style={styles.container}>
  
  
        <Text>Informe o ID do cliente e clique em Pesquisar</Text>
        <TextInput
          mode='outlined'
          label='ID'
          onChangeText={setIdCli}
          placeholder='ID do cliente'
          keyboardType='numeric'
          style={styles.inputText}
        />
  
        <TouchableOpacity
          onPress={() => {
            getCliente(idCli)
          }}
          style={[styles.alignVH, { width: '80%', height: 40, borderColor: 'black', backgroundColor: 'blue', borderRadius: 4 }]}>
          <Text style={{ color: 'white' }}>Pressione para Pesquisar</Text>
        </TouchableOpacity>
  
        <View style={{ width: '80%' }}>
          <Text >ID do cliente:</Text>
          {/* <TextInput style={[styles.inputText, { width: '20%' }]} >{cliente[0]?.id}</TextInput> */}
          <TextInput style={[styles.inputText, { width: '20%' }]} value={cliente[0]?.id.toString()}></TextInput>
          <Text>Nome do cliente:</Text>
          <TextInput style={[styles.inputText, { width: '100%' }]} value={cliente[0]?.nome}></TextInput>
  
  
          <Text>Idade do cliente:</Text>
          <TextInput style={[styles.inputText, { width: '20%' }]} value={cliente[0]?.idade.toString()} ></TextInput>
  
          {showAlert && (Alert.alert(
            'Info',
            alertMessage,
            [
              { text: 'OK', onPress: () => setShowAlert(false) }
            ],
            
            
          ))}
  
        </View>
        <StatusBar style="auto" />
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
    alignVH: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputText: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 5
    },
    alignLeft: {
  
      // flexDirection:'row',
      // justifyContent:'flex-start',
  
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      alignSelf: 'auto',
      paddingLeft: 45
    }
  });