const Sequelize = require('sequelize')

const sequelize = new Sequelize('tarefas','root','password', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(function() {
        console.log("Conexão com banco de dados com sucesso")
    }).catch(function() {
        console.log('Conexao com banco de dados falhou')
    })

module.exports = sequelize