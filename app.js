const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/todoDB";
// const autoIncrement = require("mongodb-autoincrement");
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', (callback) => {
    console.log('Connection to todoDB Successfull......')
});

const app = express();
// User model
// const User = require("./models/User");
//BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({extended: false}));
// User model
const  Todo = require("./models/Users");
//EJS CONFIG
app.use(expressLayouts);
app.set('veiws', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//TO SERVER STATIC FILES
app.use(express.static('static'));
app.use('/static', express.static('static'));
app.use(express.static(__dirname + '/static'));

//ROUTES
app.use('/', require('./route/index'));
// app.use('/users', require('./route/users'))


// db.collection('todos').findOne({}, { sort: { 'todo_id' : -1 }}, function(err, post) {
//     var lastId;
//   // console.log( post );
//   if(post == null) {
//     lastId = 0
//   } else {
//      lastId=Number(post['todo_id']);

//   }
//      db.collection('todos').insertOne( { todo_id: lastId + 1, name: "tolu oluwaseyi", class: "class of 2017"}, (err, collection) => {
//               if (err) throw err;
//             });

// });



const PORT = process.env.PORT || 90;
app.listen(PORT, console.log(`Server started on port ${PORT}`));