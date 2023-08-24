const express = require('express');
const logger = require('../config/logger');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/register-todo', async (req, res) =>{
    const {description} = req.body;
    try{
        // findOne = pega o que é único PEGAR O ID do TODOLIST
/*        if(await Todo.findOne({email})){
            logger.info(`TodoList ja existe: ${email}`);
            return res.status(400).send({error: 'TodoList ja existe'});
        }*/
        const todo = await Todo.create(req.body);
        logger.info(`TodoList cadastrado com sucesso: ${description}`);
        return res.send({user: todo});
    }catch (err){
        logger.info('Falha ao registrar TodoList: ', err);
        return res.status(400).send({error: 'Falha ao registrar TodoList'});
    }
});

router.get('/get-todos', async (req, res) => {
    try {
        // Consulta o banco de dados ou armazenamento para obter todas as tarefas
        const todos = await Todo.find();

        // Retorna as tarefas encontradas como resposta
        return res.send({ todos });
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        return res.status(500).send({ error: 'Erro ao buscar tarefas' });
    }
});

module.exports = app => app.use('/todo-list', router);