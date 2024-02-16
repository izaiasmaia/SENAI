# Tipos de bancos de dados

- SGBD (Sistema Gerenciador de Banco de Dados)

- No SQL (Ex: MongoDB, FireBase ...)
			- Bancos Não Relacional
- SQL (Ex: Mysql, Oracle, SQL Server, FireBird ...)
			- Bancos Relacionais

# MER x DER
- MER (Modelo Entidade Relacionamento)
- DER (Diagrama Entidade Relacionamento)

- Chave
	- Campo único que identifica o registro (A linha inteira de dados)
	- Chave Primária (Não se repete na tabela)
	- Chave Estrangeira (Se repete na tabela e sempre faz referência a uma chave primária em outra tabela)

- <b>Conceitual</b>
	- Mais próximo do problema,
	- descreve as concistências dos dados através dos relacionamentos
	- Não tem a necessidade de apresentar as chaves estrangeiras
	- Possui cardinalidades
		- 1 para 1
		- 1 para N
		- N para N
		- Min x Max
- <b>Lógico</b>
	- Mais próximo da solução
	- Chave primária e estrangeira
# MER
- Exemplo:
	- Banco de dados de cadastro de produtos e histórico de preços:
	- Produtos (id[inteiro], nome[texto, 45 caracteres], volume[decimal,6.2 dígitos], peso[decimal, 6.2 dígitos]);
	- Preços (id[inteiro] referencia produto(id), data[data], preço[decimal]);
# DER
- Representa com símbolos o modelo do banco de dados com suas tabelas, relacionamentos, cardinalidades e atributos.
	- Conjunto de relações entre entidades.
	- Cada elemento é uma entidade com suas propriedades e relações com outras entidades.

