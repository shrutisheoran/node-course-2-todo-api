const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');

    // // deleteMany
    // db.collection('Todos').deleteMany({text: 'Lunch'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log("Unable to delete entry", err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat dinner'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log("Unable to delete entry", err);
    // });

    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });

    // db.close();
});