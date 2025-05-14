create table PESSOA (
    id               NUMBER generated always as identity,
    nome             VARCHAR2(100),
    telefone         VARCHAR2(20),
    email            VARCHAR2(100),
    data_nascimento  DATE,
    data_cadastro    DATE default SYSTIMESTAMP
);
