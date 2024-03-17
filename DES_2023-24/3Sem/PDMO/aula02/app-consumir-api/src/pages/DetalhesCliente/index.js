import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


import api from '../../services/api/api';

export default function App() {

  const [cliente, setCliente] = useState([]);
  const [nomePesq, setNomePesq] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const inputNome = useRef(null);

  function handleButtonClick() {
    // Dá foco ao componete selecionado
    inputNome.current.focus();
  }

  /** Altera o valor de setShowAlert para true */
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  /** Altera o valor de setShowAlert para false */
  const hideAlert = () => {
    setShowAlert(false);
  };

  /**
   * Cria o componente Alert que é renderizado através do useEffect com o parâmetro showAlert
   */
  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        'Atenção!',
        alertMessage,
        [
          {
            text: 'OK',
            onPress: () => {
              hideAlert();
            }
          }
        ],
        { cancelable: false }
      );
    }
  }, [showAlert]);


  const getCliente = async () => {
    try {
      setNomePesq(nomePesq.trim());
      // console.log((nomePesq.length));
      if (nomePesq != null && nomePesq.length > 0) {
        const response = await api.get(`/clientes/${nomePesq}`)
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

            setAlertMessage('Registro não localizado na base de dados, verifique e tente novamente!')
            handleShowAlert();
          }
          else {
            console.log(response.data)
            setCliente(response.data);
          }
        }
        // console.log(cliente);
      }
      else if (id == null || id == '') {
        setCliente([]);
        setAlertMessage('Inform um valor válido para o campo!');
        handleShowAlert();
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <SafeAreaView style={styles.container}>


      <Text>Informe o nome do cliente e clique em Pesquisar</Text>
      <TextInput
        ref={inputNome}
        mode='outlined'
        label='Nome'
        onChangeText={setNomePesq}
        placeholder='Nome do cliente'
        style={styles.inputText}
      />

      <TouchableOpacity
        onPress={() => { getCliente(); handleButtonClick }}

        style={[styles.alignVH, { width: '80%', height: 40, borderColor: 'black', backgroundColor: 'blue', borderRadius: 4 }]}>
        <Text style={{ color: 'white' }}>Pressione para Pesquisar</Text>
      </TouchableOpacity>

      {cliente[0] &&
        <View style={{ width: '80%' }}>
          <Text >ID do cliente:</Text>
          {/* <TextInput style={[styles.inputText, { width: '20%' }]} >{cliente[0]?.id}</TextInput> */}
          <TextInput style={[styles.inputText, { width: '20%' }]} value={cliente[0]?.id.toString()} readOnly></TextInput>
          <Text>Nome do cliente:</Text>
          <TextInput style={[styles.inputText, { width: '100%' }]} value={cliente[0]?.nome} readOnly></TextInput>


          <Text>Idade do cliente:</Text>
          <TextInput style={[styles.inputText, { width: '20%' }]} value={cliente[0]?.idade.toString()} readOnly></TextInput>
        </View>
      }

      <StatusBar style="auto" />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  inputFocus: {
    borderWidth: 2,
    borderColor: '#576CE7',
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10
  },
  alignVH: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
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