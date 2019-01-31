const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');

let id = '5c53433979593b07d57df893';
let userId = '5b523b7ea0c02e040521bfdc';

// Todo.remove({}).then((result) => {
//     console.log(result);
// })
// .catch((e) => console.log('Todos can\'t be deleted'));

// Todo.findOneAndRemove({id})
// Todo.findByIdAndRemove(id)

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});