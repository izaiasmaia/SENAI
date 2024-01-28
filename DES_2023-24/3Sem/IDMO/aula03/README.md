
# Aula 03  
## Trabalhando com ícones  

- O uso das chaves no import indica que estamos importando funções de determinado arquivo;  
- Já quando estamos utilizando imports sem o uso de {} é quando queremos exportar e importar o módulo daquele arquivo;  

### Passo 01:  
- Criar uma pasta com nome de **aula03**, em seguida criar um novo projeto com o nome appAula03

``` bash

npx expo-create-app appAula03

```

### Passo 2: Realizar os imports no arquivo App.js 

``` Javascript

import { AntDesign } from '@expo/vector-icons/'
import FontAwesome from '@expo/vector-icons/FontAwesome'

```

### Passo 3: Criar os seguintes arquivos de estilo 

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