create database db_filmes;

use db_filmes;

CREATE TABLE `tbl_cadastro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `ano` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- INSERT INTO db_filmes.tbl_cadastro (titulo,ano) VALUES ('Chamas da Vingança',2004);

-- SELECT * FROM db_filmes.tbl_cadastro;

-- Criar usuário para acesso externo, caso seu banco esteja hospedado na nuvem
CREATE USER 'user'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;