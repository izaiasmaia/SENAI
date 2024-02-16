# Aula 04
<<<<<<< HEAD
## Trabalhando com Navegação - Tab Navigation 
=======
## Trabalhando com Navegação
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e

- React Navigation é uma das soluções existentes mais famosas e recomendadas pelo Facebook para roteamento e navegação entre telas no React Native. A famosa biblioteca Javascript, React Native, não apresenta mecanismos de navegação de forma nativa. Por isso, para executar essas ações da melhor forma possível, surgiu a biblioteca React Navigation.

### Docs React Navigation

- [React Navigation](https://reactnavigation.org/docs/getting-started/) - 

<<<<<<< HEAD
### Docs Tab Navigator:  

-  [Botton Tab Navigator](https://reactnavigation.org/docs/bottom-tab-navigator)

### Passo 01:  
- Instalar pelo terminal na aula **appAula4Pt3**:

``` bash
    npm install @react-navigation/bottom-tabs
```
### Passo 02:  
- No arquivo **App.js**: 

- Incluir o import do **createBottomTabNavigator**:
```javascript
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
```
- Em seguida alterar a variável que cria o tipo **Stack** para o tipo **Tab**:  
De:  
``` javascript
    const Stack = createNativeStackNavigator();
```

Para:  
``` javascript
    const Tab = createBottomTabNavigator();
```

- Alterar todos os componetes do tipo **Stack.Screen** para o exemplo:

```javascript
    <Tab.Screen
        //Manter o restante do código como está
    />
=======
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
>>>>>>> 1f2e5e8b38e14657527fd84becf5851b9a81ce0e
```
