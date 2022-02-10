const db = require('../models/model')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const get = async(req,res) => {
        await Tarefas.findAll()
            .then((tarefas) => {return res.status(200).json(tarefas)})
            .catch(() => {return res.status(400).json({erro: true})})
    }

    const getInner = async (req, res) => {
        await db.tarefas.findAll({
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'tiposId'] 
            },
            include: [{
                model: db.tipos,
                required: true,
                attributes: ['name'],
            }],
            order: [['id','ASC']],
        }).then((tarefas) => {return res.status(200).json(tarefas)})
    }

    const save = async (req,res) => {
        const tarefas = {...req.body}

        if(req.params.id) tarefas.id = req.params.id
        
        try {
            existsOrError(tarefas.descricao, 'Descrição não informado')
            existsOrError(tarefas.tipoId, 'Tipo não informado')
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
                descricao: tarefas.descricao,
                tiposId: tarefas.tipoId
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: `Tarefas ${tarefas.descricao} criada`
                })
            }).catch(() => {return res.status(400)})
        }

    }

    return {get, save, getInner}

}