# Aula08 - Lendo arquivo no formato .xml com React Native e Expo

## Objetivo
- O objetivo dessa aula é criar um aplicativo realize a leitura de arquivo do tipo **xml** e permita salvar essas informações em um banco de dados através de uma API.

## 1. Arquivos XML
- Arquivos XML (Extensible Markup Language) são uma forma de representar dados de forma estruturada e hierárquica usando tags de marcação.
  - **Estrutura Hierárquica**: XML organiza os dados em uma estrutura hierárquica através de tags que definem elementos e suas relações.
  - **Legibilidade**: XML é legível tanto por humanos quanto por máquinas, pois é baseado em texto simples e utiliza uma sintaxe intuitiva com tags que descrevem os dados de forma clara.
  - **Extensibilidade**: XML é "extensível" porque permite a definição de tags personalizadas para representar qualquer tipo de dados, tornando-o adequado para uma ampla gama de aplicações.
  - **Interoperabilidade**: XML é amplamente utilizado na comunicação entre sistemas heterogêneos, pois é suportado por muitas linguagens de programação e plataformas.
  - **Aplicações**: XML é comumente usado para configuração de software, troca de dados entre aplicativos, representação de documentos estruturados (como documentos HTML), entre outras aplicações.
  - Exemplo:
    ````XML
    <biblioteca>
      <livro>
          <titulo>O Senhor dos Anéis</titulo>
          <autor>J.R.R. Tolkien</autor>
          <ano>1954</ano>
          <genero>Fantasia</genero>
      </livro>
      <livro>
          <titulo>Harry Potter e a Pedra Filosofal</titulo>
          <autor>J.K. Rowling</autor>
          <ano>1997</ano>
          <genero>Fantasia</genero>
      </livro>
      <livro>
          <titulo>Código Da Vinci</titulo>
          <autor>Dan Brown</autor>
          <ano>2003</ano>
          <genero>Suspense</genero>
      </livro>
    </biblioteca>
    ````

## 2. Utilizar componente para leitura de arquivos XML
### 2.1. Iniciando um novo aplicativo React Native com Expo:
- Criar um novo projeto React Native com Expo conforme instruções:
- Acessar a pasta com com o nome da unidade curricular, **PPDM**:
- Criar uma pasta com o nome **aula08**
- Dentro da pasta **aula08** iniciar o VSCode e criar o projeto abaixo:
    - `npx create-expo-app app-file-xml`

### 2.2. Dependências
- Componentes:
  - Expo **DocumentPicker**, fornece acesso à UI do sistema para selecionar documentos dos provedores disponíveis no dispositivo do usuário.
    - `npx expo install expo-document-picker`  

  - Expo **FileSystem**, fornece acesso ao sistema de arquivos do dispositivo.
    - `npx expo install expo-file-system`  

  - **xml-js**, analisa arquivos xml e converte-os em objetos JavaScript.
    - `npm install xml-js`  

## 3. Upgrade do Expo SDK 50 para Expo SDK 51: 
- [Upgrade Expo SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) - 
  - Executar os comandos no terminal:  
    - Instala a versão mais recente do SDK do Expo:
      - `npm install expo@latest`
    
    - Atualiza as dependências do projeto:
      - `npx expo install --fix`
