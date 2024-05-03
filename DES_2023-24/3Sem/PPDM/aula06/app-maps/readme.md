# Aula06 - Trabalhando com Mapas no React Native

## Objetivo
- O objetivo dessa aula é criar um aplicativo trabalhe com navegação em mapas.

## 1. Navegação com Mapas utilizando React Native e Expo
- A navegação em mapas em dispositivos móveis utilizando React Native Expo e a biblioteca Expo Location é uma abordagem popular para desenvolvedores que desejam criar aplicativos de mapeamento multiplataforma de maneira eficiente. O React Native Expo fornece uma estrutura poderosa para desenvolver aplicativos móveis utilizando JavaScript e React, enquanto a biblioteca Expo Location oferece funcionalidades para acessar os recursos de localização do dispositivo.

## 2. Biblioteca utilizada para navegação
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PPDM**:
- Criar uma pasta com o nome **aula06**
- Dentro da pasta **aula06** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-maps`
- Comando para iniciar o projeto:
    - `npx expo start`

### 2.2. Dependências
- Expo Location:
    -Fornece acesso para leitura de informações de geolocalização, pesquisa de localização atual ou assinatura de eventos de atualização de localização do dispositivo.
    - `npx expo install expo-location`  
    - [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - 

- MapView:
    -Fornece acesso um componente de mapa que usa o Google Maps no Android e o Apple Maps ou o Google Maps no iOS.
    - `npx expo install react-native-maps`  
    - [MapView](https://docs.expo.dev/versions/latest/sdk/map-view/) - 

## 3. Modificando o projeto
### 3.1. Estrutura e arquivos
- Criar pasta **src** na raiz do projeto;
  - Dentro da pasta src criar uma pasta chamada **styles**;
  - Na pasta **syles** criar um arquivo chamado **styles.js**;
  - Recortar o conteúdo a seguir do arquivo **App.js** e colar em **styles.js**:
    ````JAVASCRIPT
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    })
    ````
  - Realizar o **import** dos componentes necessários em **styles.js**;
  - Realizar o **export** de styles, para que seja possível sua utilização nos demais arquivos.

### 3.2. Codificação

- Abir o arquivo **App.js**:
  - Obter a permissão do usuário pra acessar a localização:
    ````JAVASCRIPT
    import {requestForegroundPermissionsAsync} from 'expo-location';
    ````


