const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } =require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todo/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findById(id).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.delete('/todo/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
            return res.status(404).send() ;
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
})

app.patch('/todo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo) => {
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    }).catch((e) => res.send(400).send());
});

if(!module.parent) {
    app.listen(port, () => {
        console.log(`Started on port ${port}`);
    });
}

module.exports = {
    app
};