create database db_clientes;

use db_clientes;

create table clientes(
    id int not null auto_increment,
    nome not null varchar(50),
    idade int not null,
    primary key(id)
);