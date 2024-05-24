
/*DDL- Data Definition Language - Linguagem de Definição de Dados.
São os comandos que interagem com os objetos do banco.*/


CREATE SCHEMA IF NOT EXISTS `db_food_service`;
USE `db_food_service` ;

-- -----------------------------------------------------
-- Table `db_food_service`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(15) NOT NULL,
  `numero` VARCHAR(10) NOT NULL,
  `complemento` VARCHAR(45),
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `db_food_service`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`telefone` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `tipo` ENUM('CEL', 'RES', 'TRAB') NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `cliente_id`),
  CONSTRAINT `fk_telefone_cliente`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `db_food_service`.`cliente` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_food_service`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_food_service`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`produto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `tipo` ENUM('UN', 'LT', 'KG', 'PCT') NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `categoria_id`),
  CONSTRAINT `fk_produto_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `db_food_service`.`categoria` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_food_service`.`preco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`preco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `produto_categoria_id` INT NOT NULL,
  `valor` DECIMAL(12,2) NOT NULL,
  `ativo` TINYINT(1) NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `produto_id`, `produto_categoria_id`),
  CONSTRAINT `fk_preco_produto`
    FOREIGN KEY (`produto_id` , `produto_categoria_id`)
    REFERENCES `db_food_service`.`produto` (`id` , `categoria_id`));


-- -----------------------------------------------------
-- Table `db_food_service`.`entregador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`entregador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `veiculo` ENUM('CARRO', 'MOTO', 'BICICLETA') NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_food_service`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `entregador_id` INT NOT NULL,
  `data_hora_ini` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_hora_fim` DATETIME NULL,
  `valor_total` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `desconto` DECIMAL(12,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `cliente_id`, `entregador_id`),
  CONSTRAINT `fk_pedido_entregador`
    FOREIGN KEY (`entregador_id`)
    REFERENCES `db_food_service`.`entregador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_cliente1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `db_food_service`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_food_service`.`item_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_food_service`.`item_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  `produto_categoria_id` INT NOT NULL,
  `valor_item` DECIMAL(10,2) NOT NULL,
  `quantidade` INT NOT NULL,
  `data_cad` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `pedido_id`, `produto_id`, `produto_categoria_id`),
  CONSTRAINT `fk_pedido_itens_pedido`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `db_food_service`.`pedido` (`id`),
  CONSTRAINT `fk_pedido_itens_produto`
    FOREIGN KEY (`produto_id` , `produto_categoria_id`)
    REFERENCES `db_food_service`.`produto` (`id` , `categoria_id`))
ENGINE = InnoDB;

/*DML - Data Manipulation Language - Linguagem de Manipulação de Dados.
São os comandos que interagem com os dados dentro das tabelas.*/


INSERT INTO `db_food_service`.`cliente` (`nome`, `cpf`, `cep`, `numero`, `complemento`) VALUES 
('Paulo Sérgio', '768.633.600-78', '13502-293', '192', NULL),
('Priscila', '080.443.240-62', '69900-100', '192', NULL),
('Karina', '310.585.400-25', '70275-530', '192', NULL),
('Cibele', '562.086.370-07', '69305-050', '192', NULL),
('Marcela', '294.480.050-75', '57017-665', '192', NULL),
('Roberto', '310.585.400-25', '32210-110', '192', NULL);

INSERT INTO `db_food_service`.`telefone` (`cliente_id`, `tipo`, `numero`) VALUES 
(1, 'CEL', '98254-3432'),
(2, 'RES', '99254-3980'),
(2, 'CEL', '93254-3006'),
(1, 'CEL', '94454-0126'),
(3, 'CEL', '98954-3336'),
(4, 'CEL', '97254-3779'),
(6, 'CEL', '98454-3882'),
(5, 'CEL', '98253-3898'),
(6, 'CEL', '98252-3832'),
(1, 'CEL', '98251-4866');

INSERT INTO CATEGORIA(descricao) VALUES 
('bebidas'),
('lanches'),
('porções'),
('sobremesas'),
('combos');

INSERT INTO PRODUTO (CATEGORIA_ID, DESCRICAO, TIPO) VALUES
(1, 'Coca Cola 350 ML', 'UN'),
(1, 'Coca Cola 1 LT', 'UN'),
(2, 'X-Frango', 'UN'),
(2, 'X-Tudo', 'UN'),
(2, 'X-Bacon', 'UN'),
(2, 'X-Podrão', 'UN'),
(2, 'Hot-Dog', 'UN'),
(2, 'Pastel', 'UN'),
(2, 'X-Loucão', 'UN'),
(3, 'Batata Frita', 'UN'),
(3, 'Frango a passarinho', 'UN'),
(3, 'Salame', 'UN'),
(3, 'Mandioca Frita', 'UN'),
(4, 'Milk Shake', 'UN'),
(4, 'Petit Gateau', 'UN'),
(4, 'Picolé', 'UN'),
(5, 'Combo Kids', 'UN'),
(5, 'Combo Família', 'UN');


INSERT INTO PRECO(PRODUTO_ID, PRODUTO_CATEGORIA_ID, VALOR, ATIVO) VALUES 
(1	,1	,3.50	,1),
(2	,1	,9.00	,1),
(3	,2	,15.00	,1),
(4	,2	,18.00	,1),
(5	,2	,17.00	,1),
(6	,2	,26.00	,1),
(7	,2	,15.00	,1),
(8	,2	,8.00	,1),
(9	,2	,28.00	,1),
(10	,3	,14.50	,1),
(11	,3	,25.90	,1),
(12	,3	,24.50	,1),
(13	,3	,17.00	,1),
(14	,4	,14.00	,1),
(15	,4	,21.50	,1),
(16	,4	,4.99	,1),
(17	,5	,19.99	,1),
(18	,5	,39.99	,1);

INSERT INTO ENTREGADOR (nome, veiculo) VALUES
('Felipe','Moto'),
('Thiago','Moto'),
('Pedro','Bicicleta');


INSERT INTO pedido(cliente_id, entregador_id, data_hora_ini) VALUES
(1, 1, '2024-04-01 18:23:00'),
(2, 2, '2024-04-01 18:45:00'),
(3, 1, '2024-04-01 19:12:00'),
(6, 2, '2024-04-02 18:34:00'),
(5, 1, '2024-04-02 19:25:00'),
(4, 2, '2024-04-02 20:32:00'),
(3, 3, '2024-04-03 18:00:00'),
(4, 1, '2024-04-03 19:20:00'),
(5, 2, '2024-04-04 20:45:00'),
(1, 1, '2024-04-04 21:21:00'),
(2, 2, '2024-04-04 22:55:00'),
(3, 3, '2024-04-05 18:32:00'),
(4, 1, '2024-04-05 19:59:00'),
(5, 2, '2024-04-05 20:06:00'),
(6, 3, '2024-04-07 18:14:00'),
(1, 2, '2024-04-07 19:26:00'),
(2, 3, '2024-04-08 20:03:00'),
(3, 1, '2024-04-08 21:22:00'),
(4, 2, '2024-04-08 22:20:00'),
(5, 3, '2024-04-08 23:49:00'),
(2, 2, '2024-04-09 18:48:00'),
(2, 2, '2024-04-09 19:25:00'),
(3, 3, '2024-04-09 20:44:00'),
(4, 1, '2024-04-10 18:21:00'),
(5, 2, '2024-04-10 19:32:00'),
(6, 3, '2024-04-10 20:26:00'),
(1, 2, '2024-04-10 21:45:00'),
(2, 3, '2024-04-11 20:33:00'),
(3, 1, '2024-04-11 21:52:00'),
(4, 2, '2024-04-12 18:22:00'),
(5, 3, '2024-04-12 19:12:00'),
(6, 1, '2024-04-12 20:54:00'),
(1, 3, '2024-04-13 18:14:00'),
(2, 1, '2024-04-14 19:12:00'),
(3, 3, '2024-04-15 20:31:00'),
(4, 1, '2024-04-18 18:28:00'),
(5, 2, '2024-04-18 19:52:00'),
(6, 3, '2024-04-21 18:14:00'),
(1, 2, '2024-04-21 19:15:00'),
(2, 3, '2024-04-22 20:33:00'),
(3, 1, '2024-04-22 21:45:00'),
(4, 2, '2024-04-22 22:28:00'),
(5, 3, '2024-04-22 23:37:00'),
(6, 1, '2024-04-23 18:15:00'),
(1, 3, '2024-04-23 18:41:00'),
(2, 1, '2024-04-23 20:31:00'),
(1, 3, '2024-04-25 18:01:00'),
(2, 1, '2024-04-26 19:30:00'),
(2, 2, '2024-04-27 20:10:00'),
(3, 3, '2024-04-28 18:32:00'),
(4, 1, '2024-04-28 19:46:00'),
(5, 2, '2024-04-29 20:50:00'),
(6, 3, '2024-04-29 21:10:00'),
(1, 2, '2024-04-29 22:12:00'),
(2, 3, '2024-04-29 22:25:00'),
(3, 1, '2024-04-29 23:41:00'),
(4, 2, '2024-04-30 18:20:00'),
(5, 3, '2024-04-30 19:50:00'),
(6, 1, '2024-04-30 20:11:00'),
(1, 3, '2024-04-30 21:05:00'),
(2, 1, '2024-04-30 22:02:00'),
(3, 2, '2024-05-01 18:06:00'),
(3, 3, '2024-05-01 19:08:00'),
(4, 1, '2024-05-06 20:20:00'),
(5, 2, '2024-05-06 21:53:00'),
(6, 3, '2024-05-08 18:11:00'),
(1, 2, '2024-05-08 19:02:00'),
(2, 3, '2024-05-10 18:15:00'),
(3, 1, '2024-05-10 19:21:00'),
(4, 2, '2024-05-10 20:25:00'),
(3, 2, '2024-05-12 18:04:00'),
(3, 3, '2024-05-12 19:03:00'),
(4, 1, '2024-05-12 20:29:00'),
(5, 2, '2024-05-13 21:58:00'),
(6, 3, '2024-05-14 22:11:00'),
(1, 2, '2024-05-15 23:34:00'),
(2, 3, '2024-05-16 18:21:00'),
(3, 1, '2024-05-18 19:23:00'),
(4, 2, '2024-05-18 20:28:00'),
(5, 3, '2024-05-17 21:50:00'),
(3, 2, '2024-05-17 22:40:00'),
(3, 3, '2024-05-18 18:46:00'),
(4, 1, '2024-05-18 19:27:00'),
(5, 2, '2024-05-18 20:53:00'),
(6, 3, '2024-05-18 22:17:00'),
(1, 2, '2024-05-19 19:07:00'),
(2, 3, '2024-05-19 20:38:00'),
(3, 1, '2024-05-19 21:09:00'),
(4, 2, '2024-05-19 21:28:00'),
(5, 3, '2024-05-19 22:57:00'),
(6, 1, '2024-05-20 20:18:00'),
(1, 3, '2024-05-20 19:02:00'),
(2, 1, '2024-05-20 18:36:00');


INSERT INTO ITEM_PEDIDO( PEDIDO_ID, PRODUTO_ID, PRODUTO_CATEGORIA_ID, VALOR_ITEM, QUANTIDADE)VALUES
( 1, 15, 4, 21.50, 1 ),
( 1, 13, 3, 17.00, 1 ),
( 2, 2, 1, 9.00, 1 ),
( 2, 5, 2, 17.00, 1 ),
( 3, 1, 1, 3.50, 1 ),
( 3, 6, 2, 26.00, 1 ),
( 4, 11, 3, 25.90, 1 ),
( 4, 18, 5, 39.99, 1 ),
( 5, 1, 1, 3.50, 1 ),
( 5, 5, 2, 17.00, 1 ),
( 6, 3, 2, 15.00, 1 ),
( 6, 17, 5, 19.99, 1 ),
( 7, 4, 2, 18.00, 1 ),
( 7, 4, 2, 18.00, 1 ),
( 8, 10, 3, 14.50, 1 ),
( 8, 18, 5, 39.99, 1 ),
( 9, 7, 2, 15.00, 1 ),
( 9, 15, 4, 21.50, 1 ),
( 10, 16, 4, 4.99, 1 ),
( 10, 17, 5, 19.99, 1 ),
( 11, 1, 1, 3.50, 1 ),
( 11, 6, 2, 26.00, 1 ),
( 12, 8, 2, 8.00, 1 ),
( 12, 4, 2, 18.00, 1 ),
( 13, 14, 4, 14.00, 1 ),
( 13, 2, 1, 9.00, 1 ),
( 14, 4, 2, 18.00, 1 ),
( 14, 14, 4, 14.00, 1 ),
( 15, 4, 2, 18.00, 1 ),
( 15, 12, 3, 24.50, 1 ),
( 16, 11, 3, 25.90, 1 ),
( 16, 18, 5, 39.99, 1 ),
( 17, 5, 2, 17.00, 1 ),
( 17, 5, 2, 17.00, 1 ),
( 18, 8, 2, 8.00, 1 ),
( 18, 8, 2, 8.00, 1 ),
( 19, 15, 4, 21.50, 1 ),
( 19, 15, 4, 21.50, 1 ),
( 20, 9, 2, 28.00, 1 ),
( 20, 3, 2, 15.00, 1 ),
( 21, 5, 2, 17.00, 1 ),
( 21, 16, 4, 4.99, 1 ),
( 22, 8, 2, 8.00, 1 ),
( 22, 10, 3, 14.50, 1 ),
( 23, 10, 3, 14.50, 1 ),
( 23, 17, 5, 19.99, 1 ),
( 24, 18, 5, 39.99, 1 ),
( 24, 2, 1, 9.00, 1 ),
( 25, 12, 3, 24.50, 1 ),
( 25, 18, 5, 39.99, 1 ),
( 26, 15, 4, 21.50, 1 ),
( 26, 2, 1, 9.00, 1 ),
( 27, 18, 5, 39.99, 1 ),
( 27, 14, 4, 14.00, 1 ),
( 28, 15, 4, 21.50, 1 ),
( 28, 13, 3, 17.00, 1 ),
( 29, 4, 2, 18.00, 1 ),
( 29, 16, 4, 4.99, 1 ),
( 30, 11, 3, 25.90, 1 ),
( 30, 9, 2, 28.00, 1 ),
( 31, 9, 2, 28.00, 1 ),
( 31, 17, 5, 19.99, 1 ),
( 32, 6, 2, 26.00, 1 ),
( 32, 12, 3, 24.50, 1 ),
( 33, 5, 2, 17.00, 1 ),
( 33, 9, 2, 28.00, 1 ),
( 34, 12, 3, 24.50, 1 ),
( 34, 13, 3, 17.00, 1 ),
( 35, 10, 3, 14.50, 1 ),
( 35, 10, 3, 14.50, 1 ),
( 36, 3, 2, 15.00, 1 ),
( 36, 3, 2, 15.00, 1 ),
( 37, 6, 2, 26.00, 1 ),
( 37, 2, 1, 9.00, 1 ),
( 38, 11, 3, 25.90, 1 ),
( 38, 10, 3, 14.50, 1 ),
( 39, 16, 4, 4.99, 1 ),
( 39, 15, 4, 21.50, 1 ),
( 40, 9, 2, 28.00, 1 ),
( 40, 17, 5, 19.99, 1 ),
( 41, 5, 2, 17.00, 1 ),
( 41, 9, 2, 28.00, 1 ),
( 42, 12, 3, 24.50, 1 ),
( 42, 12, 3, 24.50, 1 ),
( 43, 8, 2, 8.00, 1 ),
( 43, 1, 1, 3.50, 1 ),
( 44, 1, 1, 3.50, 1 ),
( 44, 18, 5, 39.99, 1 ),
( 45, 16, 4, 4.99, 1 ),
( 45, 7, 2, 15.00, 1 ),
( 46, 3, 2, 15.00, 1 ),
( 46, 12, 3, 24.50, 1 ),
( 47, 14, 4, 14.00, 1 ),
( 47, 18, 5, 39.99, 1 ),
( 48, 11, 3, 25.90, 1 ),
( 48, 17, 5, 19.99, 1 ),
( 49, 16, 4, 4.99, 1 ),
( 49, 12, 3, 24.50, 1 ),
( 50, 12, 3, 24.50, 1 ),
( 50, 6, 2, 26.00, 1 ),
( 51, 10, 3, 14.50, 1 ),
( 51, 15, 4, 21.50, 1 ),
( 52, 9, 2, 28.00, 1 ),
( 52, 17, 5, 19.99, 1 ),
( 53, 5, 2, 17.00, 1 ),
( 53, 7, 2, 15.00, 1 ),
( 54, 3, 2, 15.00, 1 ),
( 54, 12, 3, 24.50, 1 ),
( 55, 14, 4, 14.00, 1 ),
( 55, 16, 4, 4.99, 1 ),
( 56, 3, 2, 15.00, 1 ),
( 56, 17, 5, 19.99, 1 ),
( 57, 6, 2, 26.00, 1 ),
( 57, 15, 4, 21.50, 1 ),
( 58, 1, 1, 3.50, 1 ),
( 58, 16, 4, 4.99, 1 ),
( 59, 4, 2, 18.00, 1 ),
( 59, 5, 2, 17.00, 1 ),
( 60, 13, 3, 17.00, 1 ),
( 60, 14, 4, 14.00, 1 ),
( 61, 13, 3, 17.00, 1 ),
( 61, 5, 2, 17.00, 1 ),
( 62, 1, 1, 3.50, 1 ),
( 62, 10, 3, 14.50, 1 ),
( 63, 11, 3, 25.90, 1 ),
( 63, 6, 2, 26.00, 1 ),
( 64, 13, 3, 17.00, 1 ),
( 64, 11, 3, 25.90, 1 ),
( 65, 16, 4, 4.99, 1 ),
( 65, 10, 3, 14.50, 1 ),
( 66, 1, 1, 3.50, 1 ),
( 66, 10, 3, 14.50, 1 ),
( 67, 11, 3, 25.90, 1 ),
( 67, 6, 2, 26.00, 1 ),
( 68, 17, 5, 19.99, 1 ),
( 68, 11, 3, 25.90, 1 ),
( 69, 2, 1, 9.00, 1 ),
( 69, 11, 3, 25.90, 1 ),
( 70, 16, 4, 4.99, 1 ),
( 70, 11, 3, 25.90, 1 ),
( 71, 3, 2, 15.00, 1 ),
( 71, 3, 2, 15.00, 1 ),
( 72, 4, 2, 18.00, 1 ),
( 72, 9, 2, 28.00, 1 ),
( 73, 17, 5, 19.99, 1 ),
( 73, 3, 2, 15.00, 1 ),
( 74, 18, 5, 39.99, 1 ),
( 74, 7, 2, 15.00, 1 ),
( 75, 17, 5, 19.99, 1 ),
( 75, 9, 2, 28.00, 1 ),
( 76, 13, 3, 17.00, 1 ),
( 76, 1, 1, 3.50, 1 ),
( 77, 18, 5, 39.99, 1 ),
( 77, 16, 4, 4.99, 1 ),
( 78, 6, 2, 26.00, 1 ),
( 78, 1, 1, 3.50, 1 ),
( 79, 2, 1, 9.00, 1 ),
( 79, 10, 3, 14.50, 1 ),
( 80, 6, 2, 26.00, 1 ),
( 80, 18, 5, 39.99, 1 ),
( 81, 16, 4, 4.99, 1 ),
( 81, 9, 2, 28.00, 1 ),
( 82, 12, 3, 24.50, 1 ),
( 82, 16, 4, 4.99, 1 ),
( 83, 6, 2, 26.00, 1 ),
( 83, 1, 1, 3.50, 1 ),
( 84, 6, 2, 26.00, 1 ),
( 84, 6, 2, 26.00, 1 ),
( 85, 13, 3, 17.00, 1 ),
( 85, 9, 2, 28.00, 1 ),
( 86, 7, 2, 15.00, 1 ),
( 86, 5, 2, 17.00, 1 ),
( 87, 4, 2, 18.00, 1 ),
( 87, 7, 2, 15.00, 1 ),
( 88, 2, 1, 9.00, 1 ),
( 88, 6, 2, 26.00, 1 ),
( 89, 8, 2, 8.00, 1 ),
( 89, 2, 1, 9.00, 1 ),
( 90, 5, 2, 17.00, 1 ),
( 90, 18, 5, 39.99, 1 ),
( 91, 4, 2, 18.00, 1 ),
( 91, 17, 5, 19.99, 1 ),
( 92, 1, 1, 3.50, 1 ),
( 92, 8, 2, 8.00, 1 ),
( 93, 1, 1, 3.50, 1 ),
( 93, 16, 4, 4.99, 1 ),
( 11, 1, 1, 3.50, 1 ),
( 84, 7, 2, 15.00, 1 ),
( 15, 12, 3, 24.50, 1 ),
( 79, 5, 2, 17.00, 1 ),
( 58, 7, 2, 15.00, 1 ),
( 8, 5, 2, 17.00, 1 ),
( 8, 11, 3, 25.90, 1 ),
( 69, 17, 5, 19.99, 1 ),
( 34, 1, 1, 3.50, 1 ),
( 10, 8, 2, 8.00, 1 ),
( 64, 4, 2, 18.00, 1 ),
( 3, 9, 2, 28.00, 1 ),
( 32, 5, 2, 17.00, 1 ),
( 22, 8, 2, 8.00, 1 );


/*
DELETE FROM telefone;
ALTER TABLE telefone AUTO_INCREMENT = 1;
DELETE FROM cliente;
ALTER TABLE cliente AUTO_INCREMENT = 1;
DELETE FROM categoria;
ALTER TABLE categoria AUTO_INCREMENT = 1;
DELETE FROM produto;
ALTER TABLE produto AUTO_INCREMENT = 1;
DELETE FROM pedido;
ALTER TABLE pedido AUTO_INCREMENT = 1;
DELETE FROM item_pedido;
ALTER TABLE item_pedido AUTO_INCREMENT = 1;
DELETE FROM preco;
ALTER TABLE preco AUTO_INCREMENT = 1;
*/
