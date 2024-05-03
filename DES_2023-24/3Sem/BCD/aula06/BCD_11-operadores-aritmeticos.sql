/*
OPERADORES ARITMÉTICOS

No MySQL, assim como em muitos outros sistemas de gerenciamento de banco de dados (SGBD), 
você pode usar uma variedade de operadores aritméticos para realizar operações matemáticas em seus dados;
*/

USE VENDAS;

/* ADIÇÃO */
SELECT 100 + 50 AS RESULT;

/* ADIÇÃO E SUBTRAÇÃO */
SELECT 100 + 8 - 20 AS RESULT;

/* SUBTRAÇÃO */
SELECT 8 - 5 AS RESULT;

/* MULTIPLICAÇÃO */
SELECT 2 * 5 AS RESULT;

/* MULTIPLICAÇÃO COM ADIÇÃO */
SELECT (2 * 5 + 10) RESULT;

/* MULTIPLICAÇÃO COM DIVISÃO */
SELECT (2 * 5 / 10) RESULT;

/* MULTIPLICAÇÃO, ADIÇÃO E DIVISÃO */
SELECT ((2 * 5) + 10 / 10 ) RESULT;

/* ARREDONDANDO VALORES */
SELECT ROUND(2 * 5 / 13) RESULT;

/* Selecionar um produto junto com o valor mais atual, criando um valor calculado (preco_total) referente ao valor do produto multiplicado pela quantidade */
SELECT 
    p.nome_prod AS produto,
    vp.valor AS valor_unitario,
    vp.valor * 5 AS preco_total
FROM 
    tbl_produtos p
JOIN 
    tbl_valor_produtos vp ON p.id = vp.id_prod
WHERE
    p.nome_prod = 'Produto A'
ORDER BY 
	vp.data_cad DESC
LIMIT 1;


/* UPDATE COM OPERAÇÃO ARITMÉTICA */
UPDATE tbl_valor_produtos AS vp
SET 
    vp.valor = vp.valor * 1.05
WHERE ID = 11;


USE VENDAS;

SELECT 
    (SELECT COUNT(ID) FROM TBL_PRODUTOS) AS TOTAL_P, 
    (SELECT COUNT(ID) FROM TBL_VALOR_PRODUTOS) AS TOTAL_VP,
    (SELECT TOTAL_P + TOTAL_VP) AS TOTAL_GERAL;


SELECT 
    COUNT(P.ID) AS TOTAL_P  
FROM
    TBL_PRODUTOS AS P
        INNER JOIN
    TBL_VALOR_PRODUTOS AS VP

















