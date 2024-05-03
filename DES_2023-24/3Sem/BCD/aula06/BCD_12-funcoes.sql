/*
Funções

No MySQL, assim como em muitos outros sistemas de gerenciamento de banco de dados (SGBD), você pode usar uma variedade de funções para facilitar a utilização das queries;
*/

/* FUNÇÕES DE DATA */
/* Calcula a subtração em uma data através do intervalo informado */
SELECT DATE_SUB(NOW(), INTERVAL 2 DAY);
SELECT DATE_SUB(NOW(), INTERVAL 2 HOUR);
SELECT DATE_SUB(NOW(), INTERVAL 2 YEAR);
SELECT DATE_SUB(NOW(), INTERVAL 2 MINUTE);
SELECT DATE_SUB(NOW(), INTERVAL 120 SECOND);
SELECT DATE_SUB('2024-04-10', INTERVAL 2 DAY); 

SELECT DATE_ADD(NOW(), INTERVAL 2 DAY);

/* Retorna a data atual.*/
SELECT CURDATE();

/* Retorna a hora atual.*/
SELECT CURTIME();

/*COUNT: Usada para contar o número de registros retornados por uma consulta.*/
SELECT COUNT(*) AS QTD_PRODUTOS FROM VENDAS.TBL_PRODUTOS;

/*SUM: Usada para calcular a soma de valores em uma coluna.*/
SELECT SUM(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;

/*AVG: Usada para calcular a média de valores em uma coluna.*/
SELECT AVG(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;

/*MAX: Usada para encontrar o valor máximo em uma coluna.*/
SELECT MAX(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;
SELECT MAX(ID) AS MAIOR_ID FROM VENDAS.TBL_VALOR_PRODUTOS;
SELECT MAX(ID) AS MAIOR_ID FROM VENDAS.TBL_PRODUTOS;

/*MIN: Usada para encontrar o valor mínimo em uma coluna.*/
SELECT MIN(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;
SELECT MIN(ID) AS MENOR_ID FROM VENDAS.TBL_VALOR_PRODUTOS;
SELECT MIN(ID) AS MENOR_ID FROM VENDAS.TBL_PRODUTOS;

/*GROUP BY: Usada para agrupar registros com base em valores semelhantes em uma ou mais colunas.*/
SELECT ID_PROD FROM VENDAS.TBL_VALOR_PRODUTOS GROUP BY ID_PROD;

/*ORDER BY: Usada para classificar os resultados de uma consulta em ordem ascendente ou descendente com base em uma ou mais colunas.*/
SELECT 
    ID_PROD
FROM
    VENDAS.TBL_VALOR_PRODUTOS
GROUP BY ID_PROD
ORDER BY ID_PROD DESC;

/* DISTINCT: Usada para retornar valores distintos em uma coluna. */
SELECT DISTINCT(ID_PROD) FROM VENDAS.TBL_VALOR_PRODUTOS;

/* LIKE: Usada para realizar uma correspondência de padrões em uma consulta, útil para pesquisas de texto parciais. */
SELECT * FROM VENDAS.TBL_PRODUTOS WHERE NOME_PROD LIKE 'A%';

SELECT * FROM VENDAS.TBL_PRODUTOS WHERE NOME_PROD LIKE '%Rr%';

/*LIMIT: Usada para restringir o número de registros retornados por uma consulta.*/
SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY ID LIMIT 3;
SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY NOME_PROD LIMIT 2;
SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY NOME_PROD DESC LIMIT 2;


/* Arrendondamento de números */
SELECT ROUND(123.4545, 2), ROUND(123.45, - 2);

/* Raiz quadrada */
SELECT SQRT(9), SQRT(16);

/* Retorna o inteiro menor ou igual à expressão numérica especificada.*/
SELECT FLOOR(123.45), FLOOR(-123.45), FLOOR(12.99);  

/* Retorna o valor da expressão especificada para a potência indicada.*/
SELECT POWER(2, 2);  

/* Retorna o valor do PI */
SELECT PI();  




