const express = require('express');
require('dotenv').config();
const logger = require('./config/logger');

const app = express();
const appurl = process.env.APP_URL;
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

require('./controllers/authController')(app); // passando o "app" para "authController"
require('./controllers/todoController')(app); // passando o "app" para "todoController"
require('./controllers/userController')(app); // passando o "app" para "userController"

app.listen(port, function() {
    logger.info(`Servidor em execucao: ${appurl}:${port}`);
})