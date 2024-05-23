# 01 - Atividade - PWBE2/PPDM - Leitura e CRUD de dados JSON

## Atividade individual.

Com base no projeto JSON postado na SPRINT 3, aula: 06 - PPDM- Manipulação de dados JSON,

### Desenvolver:
- **APP Mobile para selecionar, ler e realizar chamada em API:** 
  - Selecionar o arquivo no armazenamento do dispositivo;  
  - Ler arquivo no formato JSON;  
  - Realizar a chamada da API para salvar os dados;  

- **API para receber solicitações e salvar dados recebidos no banco de dados:**    
  - Arquivo de rotas utilizadas no projeto;
  - Controller para manipular os dados recebidos;
  - Classe para instanciar objetos;
  - Model para manipular o banco de dados;

- **Modelo do arquivo a ser lido:**  
```` JSON
[
    {
        "nome": "Napoleão Bonaparte",
        "data_nasc": "12/05/1995",
        "cpf": "12345678901",
        "sexo": "M",
        "estado_civil": "casado",
        "email": "napoleão@example.com",
        "telefone": "(19) 99999-5555"
    }
]
````

**Nesta atividade serão avaliados os seguintes critérios:**

**Critérios:**

- PPDM (App Mobile):
    (C) - Entrega da atividade.
    (D) - Criar função para selecionar corretamente o arquivo a ser lido.
    (D) - Criar função para permitir a leitura de arquivos no armazenamento do dispositivo móvel.
    (D) - Realizar a chamada da API para realizar o INSERT..

- PWBE2 (API + Banco):
    (C) - Entrega da atividade.
    (D) - Criar Controller para manipular as informações recebidas.
    (D) - Criar Classe para instanciar os objetos recebidos.
    (D) - Criar Model para realizar o INSERT dos objetos criados.
    (D) - Criar funcionalidade para verificar se o registro já existe no Banco de dados, caso exista, retornar uma mensagem informando ao usuário.

A atividade será desenvolvida e avaliada seu funcionamento em aula!
Entregar a atividade no **CLASSROOM** e **GITHUB** simultaneamente:  

Para a entrega no **CLASSROOM**:
 - Retirar a pasta **NODE_MODULES** do(s) projetos(s).

Para a entrega no **GITHUB**:
 - Colocar o link em um arquivo de texto e salvar no **CLASSROOM**.