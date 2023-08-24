const express = require('express');
const logger = require('../config/logger');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) =>{
    const {email} = req.body;
    try{

        // auth deve ser usado apenas para autentica��o no sistema, cadastro deve ser feito no userController

        // findOne = pega o que � �nico
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

module.exports = app => app.use('/auth', router);