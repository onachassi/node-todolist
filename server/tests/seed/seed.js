const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken')
const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')
const UserOneId = new ObjectID();
const UserTwoId = new ObjectID();
var {mongoose} = require('./../../db/mongoose');

mongoose.Promise = global.Promise;

const users = [{
  _id: UserOneId,
  email: 'seed@seed.com',
  password: 'seed1password',
  tokens: [{
  	access: 'auth',
  	token: jwt.sign({_id: UserOneId, access: 'auth'}, 'abc123').toString()
  }]
},{
	_id: UserTwoId,
  email: 'seed2@seed2.com',
  password: 'seed2password'
}]

const populateUsers = (done) => {
	User.remove({}).then(()=>{
		var userOne = new User(users[0]).save();	
		var userTwo = new User(users[1]).save();
	

		return Promise.all([userOne, userTwo])
		}, (err) => {
			console.log(err)
		})
}



const todos = [{
	_id: new ObjectID(),
	text: 'First todo'
},{
	_id: new ObjectID(),
	text: "second todo",
	completed: true,
	completedAt: 333
}]

const populateTodos = (done) => {
	Todo.remove({})
	  .then((done)=>{
		 Todo.insertMany(todos)
		 return done()
	  })
	  .catch((err)=>{
	  	console.log(err)
	  })
}

populateTodos()

// populateUsers()


module.exports = {todos, populateTodos, users, populateUsers}