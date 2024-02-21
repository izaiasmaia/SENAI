/*
========== DCL: linguagem de controle de dados ==========

Esse subconjunto do SQL envolve comandos relacionados à segurança do banco de dados. 
A DCL (Data Control Language) controla o acesso aos dados, tanto concedendo privilégio de acesso, quanto retirando a permissão do usuário.

GRANT 
Fornece a determinada pessoa o privilégio de acesso dentro do banco de dados. No exemplo a seguir, estamos permitindo a Luiz consultar os dados da tabela estudantes. */
GRANT SELECT ON estudantes TO Luiz;

/*REVOKE

Esse comando altera os privilégios de acesso, ou seja, faz a operação inversa ao GRANT, negando a permissão. 
A seguir, vamos desfazer o que fizemos com GRANT. Para isso, utilizaremos o FROM. 
*/
REVOKE SELECT ON estudantes FROM Luiz;

/* Realizar o exemplo abaixo: */
create user 'nome_do_usuario' identified by 'senha'; -- cria um suauário
grant select on *.* to 'nome_do_usuario'; -- concede o direito de consulta em todos os objetos do banco de dados.

/*
========== DDL: linguagem de definição de dados ==========

A DDL (Data Definition Language) engloba os comandos de definição do banco de dados. Interagem com os objetos do banco. São eles: 

CREATE
De modo geral, o comando Create cria objetos. Pode ser usado para criar desde novos bancos de dados completamente zerados a tabelas específicas. 
No exemplo, estamos criando uma tabela para os dados de clientes.
*/



CREATE TABLE tbl_clientes(
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	telefone VARCHAR(45) NOT NULL,
	endereco VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
  );


/*DROP
O comando Drop exclui objetos do banco de dados. Essa remoção de tabelas envolve todas as linhas, privilégios e índices. 
Na aplicação, o drop não necessita de nenhuma cláusula adicional.*/

CREATE DATABASE TESTE_FN CHARSET=UTF8MB4 COLLATE utf8mb_general_ci; -- Cria uma nova base de dados
DROP DATABASE TESTE_FN; -- Exclui a base de dados

/*ALTER

O ALTER altera objetos já existentes, seja modificando, excluindo ou adicionando. 
No exemplo a seguir, alteramos a tabela estudantes excluindo a coluna nome. No mesmo caso, vemos também o uso do DROP.*/

ALTER TABLE tbl_clientes
DROP COLUMN nome;

/*TRUNCATE

Exclui todo o conteúdo de uma tabela e redefine sua identidade para o valor inicial. Essa exclusão envolve também os 
espaços destinados aos registros. Trata-se de uma operação que não pode ser revertida.*/

TRUNCATE TABLE tbl_clientes;

/*COMMENT

É uma função usada para fazer um comentário explicativo ou impedir a execução de uma linha de SQL pelo sistema. Esse princípio, 
a possibilidade de fazer comentários, é comum a outras linguagens de programação, representado por diferentes símbolos. 
Existem duas opções de COMMENT no SQL: simbolizado por dois traços ( — ), estando tudo posterior a eles na linha 
automaticamente anulado na execução do código, ou por meio da utilização de um asterisco e uma barra (/*), 
que necessita ser aberto antes do início do comentário, e fechado, após o fim deste. O primeiro, de dois traços, é usado para 
comentários de apenas uma linha. O segundo, o comentário multilinhas, para aqueles com duas ou mais. Vejamos exemplos:

-- atencao para aniversario 
/* Dois estudantes comemoram aniversario em data diferente da que foram registrados */

/*RENAME
É um comando bastante simples, sua função é renomear objetos. Na sintaxe, é preciso citar qual objeto sofrerá a alteração e qual será o novo nome.*/

RENAME TABLE estudantes TO alunos;


/*
Verifica se uma base de dados existe, caso positivo deleta com o DROP:
*/
DROP DATABASE IF EXISTS compras;

/*
Criar Banco de Dados na coleção adequada para nosso idioma e */
CREATE DATABASE TESTE_FN CHARSET=UTF8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE DATABASE TESTE_FN;

USE TESTE_FN;

-- DDL -- A Linguagem de Definição de Dados, ou DDL, é composta pelos comandos responsáveis pela criação, edição e exclusão de tabelas e banco de dados SQL
CREATE TABLE tbl_clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  telefone VARCHAR(45) NOT NULL,
  endereco VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));
  
  /*
  Exibe as tabelas que existem na base de dados
  */
  SHOW tables;
  
-- Apenas criando a tabela.
CREATE TABLE usuario(
	cod INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR (50) NOT NULL,
	data DATE NOT NULL,
	hora TIME NOT NULL,
	PRIMARY KEY(cod)
);

-- Criando a tabela se ela não existir.
CREATE TABLE IF NOT EXISTS NOME_DA_TABELA(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

-- ADICIONANDO COLUNA SEM POSICAO. ULTIMA POSICAO
ALTER TABLE NOME_DA_TABELA 
ADD COLUNA varchar(30);

-- ADICIONANDO UMA COLUNA COM POSICAO
ALTER TABLE NOME_DA_TABELA 
ADD COLUMN COLUNA4 VARCHAR(30) NOT NULL UNIQUE
AFTER COLUNA3;

-- MODIFICANDO O TIPO DE UM CAMPO
ALTER TABLE NOME_DA_TABELA
MODIFY COLUNA2 DATE NOT NULL;

-- RENOMEANDO O NOME DA TABELA
ALTER TABLE NOME_DA_TABELA 
RENAME NOVO_NOME_DA_TABELA;

-- ADICIONANDO UMA PK - Chave primária
ALTER TABLE NOME_DA_TABELA 
ADD PRIMARY KEY (NOME_DA_COLUNA);

-- ADICIONANDO UMA FK - Chave estrangeira
ALTER TABLE telefones ADD CONSTRAINT id_cliente
FOREIGN KEY(id_cliente) REFERENCES clientes (id);

-- ALTERANDO O NOME DE UMA COLUNA
ALTER TABLE NOME_DA_TABELA
CHANGE NOME_ATUAL NOVO_NOME VARCHAR(50);

-- OBTEM INFORMAÇÕES SOBRE UMA TABELA
DESCRIBE NOME_DA_TABELA;
