# Aula 04
## Trabalhando com Navegação

- React Navigation é uma das soluções existentes mais famosas e recomendadas pelo Facebook para roteamento e navegação entre telas no React Native. A famosa biblioteca Javascript, React Native, não apresenta mecanismos de navegação de forma nativa. Por isso, para executar essas ações da melhor forma possível, surgiu a biblioteca React Navigation.

### Docs React Navigation

- [React Navigation](https://reactnavigation.org/docs/getting-started/) - 

### Passo 01:   
- Instalar as bibliotecas:  
```bash
expo install @react-navigation/drawer  
expo install react-native-gesture-handler react-native-reanimated  
```

### Passo 02:  
- Acessar a o endereço:  

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)  

Navegar até a **Installation** e localizar **Step 2**, copiar o plugin e colar no arquivo babel.config.js localizado em seu projeto:  

```javascript
plugins: [
    ...
    'react-native-reanimated/plugin',
],
```

### Passo 03:  
- Importar no App.js para finalizar a instalação de react-native-gesture-handler, adicione o import no topo (certifique-se de que está no topo e não há mais nada antes dele):
```javascript
import 'react-native-gesture-handler';
```
### Passo 04:  
- Em **routes/index.js** 

- Apagar todo conteúdo da função **Routes()**, devendo ficar dessa forma:  
```javascript
export default function Routes() {
  return (
  
  )
}
```
- Apagar o import:  
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
```
- Apagar a variável:  
```javascript
const Tab = createBottomTabNavigator();
```

### Passo 05:  

- Realizar o import do Drawer:
```javascript
import { createDrawerNavigator } from "@react-navigation/drawer";
```

- Realizar a criação da const:
```javascript
const Drawer=createDrawerNavigator();
```

### Passo 06:  

- Criar uma pasta chamada **components** na raiz da aplicação
- Dentro da pasta **components** criar um arquivo **CustomDrawer.js**, neste arquivo digitar o seguinte código:

```javascript
import {View, Text} from 'react-native'

export default function CustomDrawer(){
    return(
        <View>
            <Text>TESTE</Text>
        </View>
    )
}
```