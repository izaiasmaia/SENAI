# Aula 04
## Trabalhando com Navegação - Tab Navigation 

- React Navigation é uma das soluções existentes mais famosas e recomendadas pelo Facebook para roteamento e navegação entre telas no React Native. A famosa biblioteca Javascript, React Native, não apresenta mecanismos de navegação de forma nativa. Por isso, para executar essas ações da melhor forma possível, surgiu a biblioteca React Navigation.

### Docs React Navigation

- [React Navigation](https://reactnavigation.org/docs/getting-started/) - 

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
```
