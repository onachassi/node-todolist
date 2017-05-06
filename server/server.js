const _ = require('lodash')
const {ObjectID} = require('mongodb')
const express = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')


var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res)=>{
	var todo = new Todo({
		text: req.body.text
	})
	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e)
	})
})


app.get('/todos', (req, res)=>{
	Todo.find().then((todos)=>{
		res.send({todos})
	}, (err)=>{
		res.status(400).send(err)
	})
})


app.get('/todos/:id', (req, res)=>{
	var id = req.params.id
	// validate ID -- if invalide, respond w 404 and send back empty body
	if (!ObjectID.isValid(id)){
		res.status(404).send()
	}

	Todo.findById(id).then((todo)=>{
		if(!todo){
			res.status(404).send()
		}
		res.send({todo})
	}).catch((e)=>{
		res.status(400).send()
	})

}, (err)=>{
	res.status(400).send()
})

app.delete('/todos/:id', (req, res)=>{
	var id = req.params.id

	if (!ObjectID.isValid(id)){
		return res.status(404).send()
	}

	// remove todo by id
	Todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			return res.status(404).send()
		}
		res.send({todo})
	}).catch((e)=>{
		res.status(400).send()
	})
})

// setup patch route, takes two arguments: 
// 1st is url
// 2nd is callback with request and response params
app.patch('/todos/:id', (req, res)=>{
	var id = req.params.id
	// hard params
	var body = _.pick(req.body, ['text', 'completed'])
	if (!ObjectID.isValid(id)){
		return res.status(404).send()
	}
	// if completed and is boolean then set completed at
	if (_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
// find todo by id and update
	Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo})
	}).catch((err)=>{
		res.status(404).send()
	})

})


app.post('/users', (req, res)=>{
	var body = _.pick(req.body, ['email', 'password'])
	var user = new User(body)

	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(user)
	}).catch((e)=>{
		res.status(400).send(e)
	})
})



// authenticate middleware
app.get('/users/me', authenticate,(req, res)=>{
	res.send(req.user)
})

app.listen(port, ()=>{
	console.log('Started on port ', port)
})











