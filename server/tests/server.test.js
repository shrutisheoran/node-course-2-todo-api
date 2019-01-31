const expect = require('expect')
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err)
                    return done(err);

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should create a new todo', (done) => {
        request(app)
            .get(`/todo/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID();
        request(app)
            .get(`todo/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if todo id is invalid', (done) => {
        request(app)
            .get('/todo/124')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todo/:id', () => {
    it('should remove a todo', (done) => {
        let id = todos[1]._id.toHexString();
        request(app)
            .delete(`/todo/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if(err)
                    return done(err);
                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app)
            .delete(`/todo/${id}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todo/123abc`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todo/:id', () => {
    it('should update todo', (done) => {
        let id = todos[0]._id.toHexString();
        let text = 'First Todo Text is changed';
        request(app)
            .patch(`/todo/${id}`)
            .send({
                text,
                completed: true,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end((err, res) => {
                if(err)
                    return done(err);
                Todo.findById(id).then((todo) => {
                    expect(todo.text).toBe(text);
                    expect(todo.completed).toBe(true);
                    expect(todo.completedAt).toBeA('number');                    
                    done();
                }).catch(e => done(e));
            });
    });
    it('should return 404 if todo not found', (done) => {
        let id = todos[1]._id.toHexString();
        let text = 'Second Todo Text is changed';
        request(app)
            .patch(`/todo/${id}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end((err, res) => {
                if(err)
                    return done(err);
                Todo.findById(id).then((todo) => {
                    expect(todo.text).toBe(text);
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toNotExist();
                    done();
                }).catch(e => done(e));
            });
    });
});