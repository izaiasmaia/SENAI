import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XmlParser from 'xml-js'; // biblioteca para analisar XML

export default function App() {
  const [dados, setDados] = useState(null);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      console.log(resultado);

      // Verificar se o usuário cancelou a seleção do arquivo
      if (resultado.canceled == true) {
        Alert.alert('Seleção de arquivo cancelada');
        return;
      }

      const { assets: [{ uri, mimeType }], canceled } = resultado;
      console.log(uri);


      // Verificar a extensão do arquivo
      if (mimeType !== 'text/xml') {
        Alert.alert('Arquivo selecionado não é do tipo XML');
        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(uri);
      const dadosXML = XmlParser.xml2js(conteudo, { compact: true, spaces: 4 });
      console.log('====================================');
      console.log(dadosXML);
      console.log('====================================');
      setDados(dadosXML);
      console.log(dados.biblioteca.livro);

    } catch (error) {
      console.error('Erro ao selecionar o arquivo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Arquivo" onPress={selecionarArquivo} />
      {dados ? (
        <View>
          <Text>Dados do arquivo:</Text>
          {/* Aqui você pode exibir os dados do arquivo como desejar */}
          <Text>{JSON.stringify(dados)}</Text>
        </View>
      ) : (
        <Text>Nenhum arquivo selecionado</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
