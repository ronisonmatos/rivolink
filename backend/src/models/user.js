const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    roleType: {
        type: String,
        require: true,
    },
    professionalResponsible: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: String,
        require: true,
    },
    enable: {
        type: Boolean,
        require: true,
        default: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        request: true,
        select: false, // select = false não retorna a senha na consulta
    },
    createdAt:{
        type: Date,
        default: () => new Date(Date.now() - 3 * 60 * 60 * 1000), // Adjusted for GMT-3
    }
});

// "pre" faz algo antes de salvar
UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;