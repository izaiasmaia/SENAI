# Aula02 - Consumindo API com React Native e JavaScript async/await

## 1. Introdução
### 1.1. O que é uma API?
- API é um conjunto de rotinas e padrões de programação para acesso a um aplicativo de software ou plataforma baseado na Web.
- A sigla API refere-se ao termo em inglês "Application Programming Interface" que significa em tradução para o português "Interface de Programação de Aplicativos".

### API REST
- REST é um acrônimo para Representational State Transfer, que significa Transferência de Estado Representacional.
- É um estilo de arquitetura de software que define um conjunto de restrições a serem usadas para a criação de web services (serviços Web).

## 2. Consumindo API com React Native
### 2.1. Iniciando um novo aplicativo React Native com Expo, para consumir a API que já criamos.
- Criar um novo projeto React Native com Expo conforme instruções:
- Criar uma pasta com com o nome da disciplina, **PPDM**:
- Criar uma pasta com o nome **aula02**
- Dentro da pasta **aula02** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-consumir-api`
- Comando para iniciar o projeto:
    - `npx expo start`

### 2.2. Instalando dependências básicas
- Instalar as dependências básicas:
    - `npm install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`
   
  
- Instalar a dependência do React Navigation Stack:
    - `npm install @react-navigation/stack`
  
- Instalar o Axios, componente que fará a conexão com nossa API:
    - `npm install axios`
  
- Podemos utilizar o yarn como gerenciador de pacotes
    - `yarn add react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`
    - `yarn add @react-navigation/stack`

### 2.3. Configurando IP da API 
- Para os testes realizados atentar-se:
    - A API e o projeto mobile devem rodar na mesma rede, ou tem comunicação entre si através de gateway, etc.
    - O endereço da api no arquivo **./src/servives/api/api.js** deve ser o mosmo que a API esteja rodando;
  
## 3. API utilizada - aula 03 de PWBE2
- Localizar e rodar a API desenvolvida na aula03 da Unidade curricular PWBE2
