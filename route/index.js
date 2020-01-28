const express = require('express');
const router = express.Router();
const path = require('path')
const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/todoDB";
// const autoIncrement = require("mongodb-autoincrement");
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


const Todo = require("../models/Users");


router.get('/', (req, res) => {
	Todo.find({}, (err, todoList) => {
		if(err) throw (err);
		else{
			res.render('welcome', {todoList: todoList})
		}
	})
	} );

//Submit route

router.post('/add_todo', (req,res)=> {
	var todos = req.body.item;
	if (!todos){
		res.redirect('/')
	} else{
	db.collection('todos').findOne({}, { sort: { 'todo_id' : -1 }}, function(err, post) {
    var lastId;
  // console.log( post );
  if(post == null) {
    lastId = 0
  } else {
     lastId=Number(post['todo_id']);

  }
  // Creating a New todo Item
  var newItem = new Todo({
  	todo_id: lastId + 1,
  	todos: req.body.item
  });
  Todo.create(newItem, (err, Todo) => {
  	if(err) throw err;
  	else{
  		// console.log(Todo)
  		res.redirect('/')
  	}
  })
});
}
})



//Delete route
router.get('/delete', (req,res) => {
	var id = req.query.todo;
	 Todo.find({

    },
    (err, result) => {
        if (err) throw err;
        else {
        	// Using this to access array index equal to the deleted id
        	var todo = result[id]
        	//this has nothing to do with todo_id
        	//Using this to access the already got index Id
        	var todoId = todo.id
            // console.log(todoId)
              var query = { _id: todoId };

    Todo.deleteOne(query, function (err, result) {
    	if(err) throw err;
    	// console.log(result)
    });
        }
        res.redirect('/');
    })
})

//Catch all other route

router.get('*', (req, res) => {
	res.send("<h1>error 404 Page not Found</h1>")
})

module.exports = router