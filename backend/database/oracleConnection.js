const oracledb = require('oracledb'); //importa lib oracle que instalamos no npm
require('dotenv').config(); //importa lib dotenv que instalamos no npm para usarmos variaveis de ambiente

//vai pegar dados da variavel de ambiente
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
}

async function getConnection() {
    const connection = await oracledb.getConnection(config);
    return connection;
}

//exportando a function e o oracledb
module.exports = {
    getConnection,
    oracledb
}