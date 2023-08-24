const mongoose = require('../database');

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    done: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;