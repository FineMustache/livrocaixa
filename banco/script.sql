drop database if exists caixa;
create database caixa charset=UTF8 collate utf8_general_ci;
use caixa;
create table lancamentos(
    n_lancamento integer not null primary key auto_increment,
    data date not null,
    descricao varchar(80) not null,
    valor float(6,2) not null,
    tipo varchar(1) not null
);
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/caixa-loja/banco/lancamentos.csv'
INTO TABLE lancamentos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
describe lancamentos;
show tables;