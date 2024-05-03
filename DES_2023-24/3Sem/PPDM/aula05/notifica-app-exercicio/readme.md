# Aula05 - Exibindo notificações com React Native, Expo e Expo Notiications

## Objetivo
- O objetivo dessa aula é criar um aplicativo que exiba notificações push.

## 1. Notificações  e Expo Notifications
- As notificações são mensagens curtas exibidas em smartphones para alertar os usuários sobre eventos importantes, como mensagens recebidas, atualizações de aplicativos, lembretes, etc.
- O Expo Notifications é um componente que permite que você exiba notificações push no seu aplicativo React Native.
- Notificações Push: Enviadas de um servidor para dispositivos móveis mesmo quando o aplicativo não está em execução.
- Notificações Locais: Agendadas e exibidas dentro do aplicativo em determinados horários ou eventos específicos.

## 2. Utilizar componente de notificações push
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PPDM**:
- Criar uma pasta com o nome **aula05**
- Dentro da pasta **aula05** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app notifica-app`
- Comando para iniciar o projeto:
    - `npx expo start`

### 2.2. Dependências
- Componente:
    - `npm install expo-notifications`  

## 3. Criar uma conta no site Expo  
- [Expo Signup](https://expo.dev/signup) - 

### 3.1. Criar um projeto no Expo:
- [Expo](https://expo.dev/) -  
    - Criar um projeto na sua conta Expo com o mesmo nome do projeto criado no VSCode: 'notifica-app';
    - Localizar e copiar o id do projeto;

### 3.2. Vincular projeto local ao projeto criado na sua conta Expo:
- No terminal, executar os comandos abaixo para vincular seu projeto local ao projeto criado na sua conta Expo, inclua o id do seu projeto no local indicado:
    - `npm install --global eas-cli`
    - `eas init --<id_do_seu_projeto>`    



