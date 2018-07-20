console.log("Hello");
const MongoClient = require('mongodb').MongoClient;
console.log("Hello");

MongoClient.connect('mongodb://localhost:27017TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');

    db.close();
});