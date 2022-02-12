module.exports = app => {
    app.route('/tarefas')
        .get(app.api.tarefas.getAll)
        .post(app.api.tarefas.save)

    app.route('/tarefas/:id')
        .delete(app.api.tarefas.remove)
        .put(app.api.tarefas.save)

    app.route('/tarefas/pendentes')
        .get(app.api.tarefas.pendentes)

    app.route('/tarefas/concluidos')
        .get(app.api.tarefas.concluidos)

    app.route('/tipos')
        .get(app.api.tipos.get)
        .post(app.api.tipos.save)

    app.route('/tipos/:id')
        .put(app.api.tipos.save)
}