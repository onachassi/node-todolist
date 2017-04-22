const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')




// remove all documents
// Todo.remove({}).then((result)=>{
// 	console.log(result)
// })

// User.findOneAndRemove()
// User.findByIdAndRemove()

Todo.findByIdAndRemove("58fa96afc63ea6d6e7127f7a").then((todo)=>{
	console.log(todo)
})
