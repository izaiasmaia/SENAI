create database db_clientes;

use db_clientes;

CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `idade` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO db_clientes.clientes (id,nome,idade) VALUES (null,'João',25);
INSERT INTO db_clientes.clientes (id,nome,idade) VALUES (null,'Caio',30);
INSERT INTO db_clientes.clientes (id,nome,idade) VALUES (null,'Pedro',19);
INSERT INTO db_clientes.clientes (id,nome,idade) VALUES (null,'Mariana',18);

SELECT * FROM db_clientes.clientes;