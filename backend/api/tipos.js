const db = require('../models/model')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const get = async(req,res) => {
        await db.tipos.findAll()
            .then((tipos) => {return res.status(200).json(tipos)})
            .catch(() => {return res.status(400).json({erro: true})})
    }

    const save = async (req,res) => {
        tipos = {...req.body}

        if(req.params.id) tipos.id = req.params.id

        try {
            existsOrError(tipos.name, 'Nome nao informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(tipos.id) {
            await db.tipos.update({
                name: tipos.name
            },{
                where: {
                    id: req.params.id
                }
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: `Tipo ${tipos.name} alterado`
                })
            }).catch(() => {return res.status(400).json({erro: true})})
        } else {
            await db.tipos.create({
                name: tipos.name
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: `Tipo ${tipos.title} cadastrado com sucesso`
                })
            }).catch(() => {return res.status(400).json({erro: true})})
        }

    }

    return {get, save}

}