// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Shruti Sheoran',
    //     age: '20',
    //     location: 'India'
    // }, (err, results) => {
    //     if(err) {
    //         return console.log("Unable to insert user", err);
    //     }
    //     console.log(results.ops[0]._id.getTimestamp());
    //     // console.log(JSON.stringify(results.ops, undefined, 2));
    // });

    db.close();
});