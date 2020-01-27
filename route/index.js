const express = require('express');
const router = express.Router();
const path = require('path')



const Todo = require("../models/Users");


router.get('/', (req, res) => {
	Todo.find({}, (err, todoList) => {
		if(err) console.log(err);
		else{
			res.render('welcome', {todoList: todoList})
		}
	})
	} );


//Submit route
router.post('/add_todo', (req, res) => {
	console.log('Item submitted')
	var newItem = new Todo({ 
		todos:req.body.item
	});
	Todo.create(newItem, (err, Todo) => {
		if(err) console.log(err);
		else{
			console.log("inserted Item:" + newItem)
		}
	})
	res.redirect('/');
});

//Catch all other route

router.get('*', (req, res) => {
	res.send("<h1>Page not Found</h1>")
})

module.exports = router