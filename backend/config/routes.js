module.exports = app => {
    app.route('/tarefas')
        // .get(app.api.tarefas.get)
        .get(app.api.tarefas.getInner)
        .post(app.api.tarefas.save)
    
    app.route('/tarefas/:id')
        .put(app.api.tarefas.save)

    app.route('/tipos')
        .get(app.api.tipos.get)
        .post(app.api.tipos.save)
}