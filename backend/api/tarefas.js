const db = require('../models/model')
const Sequelize = require ('sequelize')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const getAll = async(req,res) => {
        await db.tarefas.findAll({
            include: [{
                model: db.tipos,
                required: true,
                attributes: [['name','situacao']],
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tiposId'] 
            },
            attributes: ['id', ['descricao', 'tarefa',]],
            raw: true,
            order: [['id','ASC']],
        }).then((tarefas) => {return res.status(200).json(tarefas)})
            .catch(() => {return res.status(400).json({erro: true})})
    }

    const pendentes = async (req, res) => {
        await db.tarefas.findAll({
            include: [{
                model: db.tipos,
                required: true,
                where: {
                    name: "pendente"
                },
                attributes: [['name','situacao']],
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tiposId'] 
            },
            attributes: ['id', ['descricao', 'tarefa',]],
            raw: true,
            order: [['id','ASC']],
        }).then((tarefas) => {return res.status(200).json(tarefas)})
    }

    const concluidos = async (req, res) => {
        await db.tarefas.findAll({
            include: [{
                model: db.tipos,
                required: true,
                where: {
                    name: "concluido"
                },
                attributes: [['name','situacao']],
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tiposId'] 
            },
            attributes: ['id', ['descricao', 'tarefa',]],
            raw: true,
            order: [['id','ASC']],
        }).then((tarefas) => {return res.status(200).json(tarefas)})
    }

    const save = async (req,res) => {
        const tarefas = {...req.body}
        console.log(req.body)

        if(req.params.id) tarefas.id = req.params.id
        console.log(tarefas.tipoId)
        
        try {
            // existsOrError(tarefas.descricao, 'Descrição não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(tarefas.id) {
            await db.tarefas.update({
                descricao: tarefas.descricao,
                tiposId: tarefas.tipoId
            },{
                where: {
                    id: req.params.id
                }
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: `Tarefa ${tarefas.descricao} alterado`
                })
            }).catch(() => {return res.status(400).json({erro: true})})
        } else {
            await db.tarefas.create({
                descricao: tarefas.descricao
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: `Tarefas ${tarefas.descricao} criada`
                })
            }).catch(() => {return res.status(400)})
        }

    }

    const remove = async (req,res) => {
        await db.tarefas.destroy({
            where: {
                id: req.params.id
            }
        }).then((tarefas) => {
            if(tarefas == 0){
                return res.status(400).json({
                    erro: false,
                    mensagem: `Anuncio com id ${req.params.id} não encontrado`
                })
            }else{
                return res.status(200).json({
                    erro: true,
                    mensagem: `Anuncio com id ${req.params.id} deletado do banco de dados`
                })
            }
        })
    }

    return {getAll, save, remove, pendentes, concluidos}

}