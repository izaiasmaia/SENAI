CREATE DATABASE IF NOT EXISTS `db_clientes`;
USE `db_clientes` ;

-- -----------------------------------------------------
-- Table `db_clientes`.`tbl_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_clientes`.`tbl_clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `cpf` VARCHAR(15) NOT NULL,
  `sexo` ENUM('M', 'F') NOT NULL,
  `estado_civil` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`));