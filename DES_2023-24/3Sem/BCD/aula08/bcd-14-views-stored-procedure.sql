/* VIEW
Uma View é um objeto que pertence a um banco de dados, definida baseada em declarações SELECT’s, retornando uma determinada visualização de dados de uma ou mais tabelas
*/

/*Criar view*/
CREATE  OR REPLACE VIEW `new_view` AS
SELECT 
   *
FROM
    clientes;

/* Selecionar uma view */    
SELECT * FROM NEW_VIEW;

/* Inserir dados em uma view*/    
INSERT INTO new_view VALUES(
null,'ANDREIA',15 );
    
/*Deletar view*/    
DROP VIEW new_view;
    
/* STORED PROCEDURE

*/

/* Criando uma STORED PROCEDURE*/
USE `db_clientes`;
DROP procedure IF EXISTS `prc_select_clientes`;

DELIMITER $$
USE `db_clientes`$$
CREATE PROCEDURE `prc_select_clientes` ()
BEGIN
select * from clientes;
END$$
DELIMITER ;

/* Executando uma procedure*/
CALL prc_select_clientes;

/* Deletando uma procedure*/
DROP PROCEDURE `db_clientes`.`prc_select_clientes`
