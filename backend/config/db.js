const Sequelize = require('sequelize')

const sequelize = new Sequelize('tarefas','postgres','root', {
    host: 'localhost',
    dialectOptions: {
     useUTC: false     // para considerar a hora da consulta como a hora 
                       // local, logo nao soma +02:00 horas
    },
    dialect: 'postgres',
    // timezone: '+03:00',// para salvar a data baseado no fuso horario
    
})

sequelize.authenticate()
    .then(function() {
        console.log("Conexão com banco de dados com sucesso")
    }).catch(function() {
        console.log('Conexao com banco de dados falhou')
    })

module.exports = sequelize