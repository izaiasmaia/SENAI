# Aula03 - Desenvolvendo app com banco de dados interno async/await

## 1. O que é o SQLite?
- SQLite é um sistema de gerenciamento de banco de dados relacional (SGBD) leve, autônomo, de código aberto e amplamente utilizado.
- Não há necessidade de configuração ou administração de servidor. O SQLite é uma biblioteca de banco de dados que pode ser incorporada diretamente em aplicativos.
- Banco de Dados Embutido: O banco de dados SQLite é armazenado como um único arquivo em disco, tornando-o ideal para aplicativos que exigem portabilidade e facilidade de backup.
- Tipos de Dados: Suporta vários tipos de dados, incluindo INTEGER, REAL, TEXT, BLOB e NULL. Os tipos de dados são dinâmicos, permitindo que você armazene diferentes tipos de dados em uma mesma coluna.
- Compatibilidade: O SQLite é amplamente compatível com muitas linguagens de programação, incluindo C/C++, Python, Java, JavaScript (por meio de bibliotecas como SQLite.js), entre outras.
- Tamanho Compacto: A biblioteca SQLite é extremamente compacta, ocupando poucos recursos de sistema, o que a torna adequada para aplicativos de dispositivos móveis e embarcados.

## 2. Utilizar banco de dados interno: SQLite.
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da disciplina, **PPDM**:
- Criar uma pasta com o nome **aula03**
- Dentro da pasta **aula03** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-bd-sqlite`
- Comando para iniciar o projeto:
    - `npx expo start`

### 2.2. Instalando dependências básicas
- Instalar as dependências básicas:
    - `npm install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`   
  
- Instalar a dependência do React Navigation Stack:
    - `npm install @react-navigation/native-stack`
  
- Instalar o SqLite, componente de base de dados local:
    - `npx expo install expo-sqlite`
  
- Instalar o pacote abaixo como alternativa de lidar com áreas seguras:
    - `npm install react-native-safe-area-context`
  
- Instalar componente status bar height, utilizado para obter a altura do status bar:
    - `npm install --save react-native-status-bar-height`



