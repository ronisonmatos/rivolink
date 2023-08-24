const mongoose = require('mongoose');
const logger = require('../config/logger');
const dataBaseURL = process.env.MONGODB_URI;

try {
    mongoose.connect(dataBaseURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}catch (err) {
    logger.error(`Erro ao conectar com o banco de dados: ${err}`)
}

mongoose.Promise = global.Promise;

module.exports = mongoose;