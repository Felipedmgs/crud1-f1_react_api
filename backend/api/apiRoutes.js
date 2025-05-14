const express = require('express');
const router = express.Router();
const {getConnection, oracledb} = require('../database/oracleConnection'); //importa a conexão com o banco de dados
const {extisOrError} = require('./validatios'); //importa a function de validação

//function get
router.get('/usuarios', async(req, res) => {
  let conn;

  try {
    conn = await getConnection(); //pega a conexão com o banco de dados
    const select = `select    p.id, 
                                p.nome, 
                                p.telefone, 
                                p.email, 
                                TO_CHAR(p.data_nascimento, 'YYYY-MM-DD') data_nascimento, 
                                TO_CHAR(p.data_cadastro, 'DD/MM/YYYY HH24:MI:SS') data_cadastro 

                    from pessoa p   
                    order by data_cadastro desc`

    //executa a query
    const result = await conn.execute(select, [], {outFormat: oracledb.OUT_FORMAT_OBJECT });

    res.status(200).json(result.rows); //retorna os dados para o front end
  }catch (err){
    console.log(err);
    res.status(500).json({error: err.message}); //retorna o erro para o frontend
  }finally {
    if(conn) {
      await conn.close(); //fecha a conexão com o banco de dados
    }
  }
});

//function post
router.post('/usuarios', async (req, res) => {
    const {nome, telefone, email, dataNascimento} = req.body; //aqui eu puxo os dados do meu front
    try {//validando se dados existem no front para serem gravados no bd
        extisOrError(nome, 'Nome não informado');
        extisOrError(telefone, 'Telefone não informado');
        extisOrError(email, 'Email não informado');
        extisOrError(dataNascimento, 'Data de Nascimento não informada');
        console.log('dados validados');
    } catch (msg) {
        return res.status(400).send(msg); //se erro, retorna o erro para o front end
    }

    //se for validado, vamos começar a gravação no banco de dados
    let conn;

    try{
        conn = await getConnection();

        //criando variavel de execução e ja executando o insert
        const result = await conn.execute(
            `INSERT INTO pessoa (nome, telefone, email, data_nascimento) VALUES (:1, :2, :3, TO_DATE(:4, 'YYYY-MM-DD'))`,
            [nome, telefone, email, dataNascimento]);

        //confirmando a transação
        if(result.rowsAffected) {
            await conn.commit();//commita para efetiva  no banco de dados
            res.status(200).send(); //enviando ao front que foi cadastrado com sucesso
        }

    }catch (error) {
        console.error('❌ Erro ao executar INSERT:', error.message);
        res.status(500).json({ error: error.message });
    }finally {//verifico se conexao esta ativa e fecho ela
        if(conn){
            await conn.close(); //fecha a conexão com o banco de dados
        }
    }
    
});


//function put - ex http://localhost:3001/api/usuarios/1
router.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id; //pega o id da url
    const {nome, telefone, email, dataNascimento} = req.body; //pega os dados do body

    try{
        extisOrError(nome, 'Nome não informado');
        extisOrError(telefone, 'Telefone não informado');
        extisOrError(email, 'Email não informado');
        extisOrError(dataNascimento, 'Data de Nascimento não informada');
    }catch(msg){
        return res.status(400).send(msg); //se erro, retorna o erro para o front end
    }

    let conn;
    try{
        conn = await getConnection();

        //criando variavel de execução e ja executando o insert
        const result = await conn.execute(
            `UPDATE pessoa SET nome = :1, telefone = :2, email = :3, data_nascimento = TO_DATE(:4, 'YYYY-MM-DD') WHERE id = :5`,
            [nome, telefone, email, dataNascimento, id]
        );

        if(result.rowsAffected === 0) {
            res.status(404).send('Usuário não encontrado'); //se não encontrar o id, retorna erro
        }else{
            await conn.commit(); //commita para efetiva  no banco de dados
            res.status(200).json({message: 'Registro atualizado com sucesso'}); //enviando ao front que foi cadastrado com sucesso
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({error: err.message}); //retorna o erro para o frontend
    }finally {
        if(conn) {
            await conn.close(); //fecha a conexão com o banco de dados
        }
    }  
}); 

//function delete - ex http://localhost:3001/api/usuarios/1
router.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id; //pega o id da url

    let conn;
    try{
        conn = await getConnection();

        //criando variavel de execução e ja executando o insert
        const result = await conn.execute(`DELETE FROM pessoa WHERE id = :1`, [id]);
        if(result.rowsAffected === 0) {
            res.status(404).send('Usuário não encontrado'); //se não encontrar o id, retorna erro
        }else{
            await conn.commit(); //commita para efetiva  no banco de dados
            res.status(200).json({message: 'Registro excluído com sucesso'}); //enviando ao front que foi cadastrado com sucesso
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({error: err.message}); //retorna o erro para o frontend
    }
    finally {
        if(conn) {
            await conn.close(); //fecha a conexão com o banco de dados
        }
    }   
});


//export rota
module.exports = router;