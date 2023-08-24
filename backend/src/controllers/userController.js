const express = require('express');
const logger = require('../config/logger');
const User = require('../models/user');
const Todo = require("../models/todo");
const RateLimit = require('express-rate-limit');

const router = express.Router();

// Define a configura��o do rate limiter
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 10,
    message: { error: 'Muitas requisi��es. Por favor, tente novamente mais tarde.' }
});

// Aplica o rate limiter a todas as requisi��es
router.use(limiter);

router.post('/user', async (req, res) =>{
    const {email} = req.body;
    try{
        if(await User.findOne({email})){
            logger.info(`Usuario ja existe: ${email}`);
            return res.status(400).send({error: 'Usuario ja existe'});
        }
        const user = await User.create(req.body);
        //user.password = undefined; // N�o retorna a senha, mais seguran�a
        logger.info(`Usuario cadastrado com sucesso: ${email}`);
        return res.send({user});
    }catch (err){
        logger.info('Falha ao registrar usuario: ', err);
        return res.status(400).send({error: 'Falha ao registrar usuario'});
    }
});

router.get('/user', async (req, res) => {
    try {
        // Consulta o banco de dados ou armazenamento para obter todas as tarefas
        const users = await User.find();

        // Retorna as tarefas encontradas como resposta
        return res.send({  users });
    } catch (err) {
        console.error('Erro ao buscar usu�rio:', err);
        return res.status(500).send({ error: 'Erro ao buscar usu�rio' });
    }
});

module.exports = app => app.use('/users', router);