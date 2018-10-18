let express = require('express');
let bodyParser = require('body-parser');

let { Todo } = require('./models/todo');
let { User } =require('./models/users');

let app = express();

app.use(bodyParser.json());

app.post('/todos' , (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});


app.listen(3000, () => {
    console.log('Started on port 3000');
})


let newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved Todo', doc);
}, (err) => {
    console.log('Unable to save todo', err);
});

let nextTodo = new Todo({
    text: ' Edit this video ',
});

nextTodo.save().then((doc) => {
    console.log('Saved Todo', doc);
}, (err) => {
    console.log('Unable to save todo', err);
});

let newUser = new User({
    user: ' Shruti ',
    email: 'shruti.sheoran@gmail.com  '
});

newUser.save().then((doc) => {
    console.log('Saved User', doc);
}, (err) => {
    console.log('Unable to save user', err);
});