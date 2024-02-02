# Aula 04
## Trabalhando com Navegação

- React Navigation é uma das soluções existentes mais famosas e recomendadas pelo Facebook para roteamento e navegação entre telas no React Native. A famosa biblioteca Javascript, React Native, não apresenta mecanismos de navegação de forma nativa. Por isso, para executar essas ações da melhor forma possível, surgiu a biblioteca React Navigation.

### Docs React Navigation

- [React Navigation](https://reactnavigation.org/docs/getting-started/) - 

### Passo 01:   
- Criar uma pasta com nome de **routes** na raiz do projeto;
- Criar um arquivo na pasta **routes** com o nome **index.js**;
- Copiar todo conteúdo do App.js e colar em **index.js**;

### Passo 02:  
- No arquivo **index.js** retirar o componente abaixo:  

- **Importante**: não apagar o conteúdo interno desse componente
```Javascript
    <NavigationContainer>

    </NavigationContainer>
```

- Apagar o import do NavigationContainer

### Passo 03:  
- No componente Home, alterar a função navegaSobre para:

```Javascript
    function navegaDetalhes() {
        navigation.navigate('Detalhes');
    }
```
