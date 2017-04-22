const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

var id = "58faa0014fa433d81746d8cd";

if (!ObjectID.isValid(id)){
	return console.log('ID not valid')
}

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos: ', todos)
// })

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo: ', todo)
// })

Todo.findById(id).then((todo)=>{
	if (!todo){
		return console.log('Todo not found')
	}
	console.log('Todo by Id: ', todo)
}).catch((e)=>{
	console.log(e)
})