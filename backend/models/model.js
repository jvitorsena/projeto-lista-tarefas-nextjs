const Sequelize = require('sequelize')
const db = require('../config/db')

module.exports = app => {

    const tipos = db.define('tipos', {
        id:             {type: Sequelize.INTEGER(2), autoIncrement: true, primaryKey: true},
        name:           {type: Sequelize.STRING(255)},
        isActive:       {type: Sequelize.DataTypes.BOOLEAN, defaultValue: true}
    }, {freezeTableName: true})

    const tarefas = db.define('tarefas',{
        id:             {type: Sequelize.INTEGER(2), autoIncrement: true, primaryKey: true},
        descricao:      {type: Sequelize.STRING(255)},
        tiposId:        {type: Sequelize.INTEGER(2)},
        isActive:       {type: Sequelize.DataTypes.BOOLEAN, defaultValue: true}
    },{ freezeTableName: true });


    tarefas.belongsTo(tipos, {foreignKey: 'tiposId', allowNull: true})

    tipos.sync()
    tarefas.sync()

    module.exports = {tipos, tarefas}
}