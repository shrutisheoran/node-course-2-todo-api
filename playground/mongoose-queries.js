const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');

// let id = '5bd7fe105cd71d742f214f8c';
let userId = '5b523b7ea0c02e040521bfdc';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo)
//         return console.log('Id not found');
//     console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if(!user)
        return console.log('Id not found');
    console.log('User', user);
}).catch((e) => console.log(e));

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

// let nextTodo = new Todo({
//     text: ' Edit this video ',
// });

// nextTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

// let newUser = new User({
//     user: ' Shruti ',
//     email: 'shruti.sheoran@gmail.com  '
// });

// newUser.save().then((doc) => {
//     console.log('Saved User', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// });