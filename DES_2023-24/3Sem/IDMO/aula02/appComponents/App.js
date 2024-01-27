import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Platform, Pressable, Alert, Button, TextInput } from 'react-native';
import Saudacao from './components/Saudacao';

const logo = require('./assets/favicon.png')

export default function App() {
  return (
    <SafeAreaView style={[styles.androidSafeArea]}>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Text style={styles.labelInput}>Campo 1</Text>
            <TextInput placeholder='Campo 1' style={styles.input}></TextInput>
            <Text style={styles.labelInput}>Campo 2</Text>
            <TextInput placeholder='Campo 2' style={styles.input}></TextInput>
            
          </View>

          <View style={styles.separador}></View>
          <View style={styles.alinharHorizontal}>
            <Button title='Botão 1' color='midnightblue' onPress={() => Alert.alert('Eu sou um alert!')}></Button>
            <Button title='Botão 2' color='green' onPress={() => Alert.alert('Título do alert', 'Eu sou um alert!')}></Button>
            <Button title='Botão 3' color='orange' onPress={() => Alert.alert('Título do alert 3', 'Eu sou um alert!',
              [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Botão cancelar pressionado')
                },
                {
                  text: 'OK',
                  onPress: () => console.log('Botão OK pressionado')
                }
              ])}></Button>
          </View>

          <View style={styles.separador}></View>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'red' : 'gray'
              },
              styles.button,
            ]}
            onPress={() => Alert.alert('Botão pressionado!')}>
            <Text>Button</Text>
          </Pressable>

          <View style={styles.separador}></View>

          <Saudacao name={'Izaias'} />
          <Image source={logo}></Image>

          <Image source={{ uri: 'https://picsum.photos/500' }} style={{ width: 300, height: 200 }} />
          <Text style={styles.fontF}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          </Text>


          {/* <View style={[styles.lightgreenBox, styles.borderMargin]}>
        
        <Text style={{ color: 'red' }}>Lightgreen Box </Text>
      </View> */}

          {/* <View style={[styles.lightblueBox, styles.borderMargin]}>
        <Text>Lightblue Box</Text>
      </View> */}



          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  // fontF: {
  //   fontFamily: 'e',
  //   fontWeight: 'bold',
  //   fontSize: 30
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  lightgreenBox: {
    backgroundColor: 'lightgreen',
    width: 200,
    height: 100,
  },
  lightblueBox: {
    backgroundColor: 'lightblue',
    width: 200,
    height: 100,
  },
  borderMargin: {
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%'
  },
  separador: {
    width: '100%',
    backgroundColor: 'gray',
    height: 1,
    margin: 10,
  },
  alinharHorizontal: {
    // flex: 1,
    // width:'100%',
    flexDirection: 'row',
    gap: 10,
  },
  input:{
    width:'100%',
    height:40,
    borderWidth:1,
    padding:10,
    fontSize:20,
    borderRadius:10,
  },
  labelInput:{
    width:'100%',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:5,
    marginTop:10
  }

});
