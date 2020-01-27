var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
 todo_id : {
    type: Number,
    // required: true
 },
 todos: {
    type : String,
}

});




const Todo = mongoose.model('Todo', todoSchema, 'todos');
module.exports = Todo
