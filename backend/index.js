const express = require('express')
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const cors = require ('cors')

app.use(express.json())

app.db = db

app.use((req, res, next) => { // middleware
    res.header("Access-Control-Allow-Origin", "*") // qualquer aplicação pode fazer requisição
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER Content-Type, Authorization");
    app.use(cors())
    next();
})

consign()
    .include('./api/validation.js')
    .then('./models')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(8000, () => {
    console.log('Backend executando na porta 8000')
})
