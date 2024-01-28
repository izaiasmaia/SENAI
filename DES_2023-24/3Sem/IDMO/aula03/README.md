
# Aula 03  
## Trabalhando com ícones  

- O uso das chaves no import indica que estamos importando funções de determinado arquivo;  
- Já quando estamos utilizando imports sem o uso de {} é quando queremos exportar e importar o módulo daquele arquivo;  
- As bibliotecas que utilizaremos possuem ícones no formato SVG, tamanho bem pequeno para aplicações mobile

### Passo 01:  
- Criar uma pasta com nome de **aula03**, em seguida criar um novo projeto com o nome appAula03

``` bash

npx expo-create-app appAula03

```

### Passo 02: Realizar os imports no arquivo App.js 

``` Javascript

import { AntDesign } from '@expo/vector-icons/'
import FontAwesome from '@expo/vector-icons/FontAwesome'

```

### Passo 03: Alterar a estrutura padrão 

``` Javascript

export default function App() {
  return (
    <SafeAreaView style={[styles.androidSafeArea, styles.container]}>
      <Text>Aula 03 - Trabalhando com ícones</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

```

### Passo 04: Criar os seguintes arquivos de estilo 

``` Javascript

 container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  alinharHorizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  }

```

### Passo 05: Criar os seguintes elementos e visualizar as alterações no smartphone 

``` Javascript


    {/* Ícone exibido em uma View com texto */}
    <View style={styles.alinharHorizontal}>
        <FontAwesome name='home' size={32} color='gray'></FontAwesome>
        <Text style={{ fontSize: 24 }}>Bem vindo ao início</Text>
    </View>

    {/* Ícone e botão criado com a biblioteca padrão*/}
    <AntDesign.Button name='home' size={48} backgroundColor='green' borderRadius={20} onPress={() => Alert.alert('Você clicou no Antdesign Button')}>
        Home
    </AntDesign.Button>

    {/* Ícone e botão criado com a biblioteca FontAwesome*/}
    <FontAwesome.Button name='home' onPress={() => Alert.alert('Você clicou no Awesome Button')}>
        Home
    </FontAwesome.Button>

```