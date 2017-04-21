// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)

// first argument url of db, could be amazon s3 or heroku ect.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('-Connected to MongoDB Server-')

// pull out all uncomplete todos and strigify them
	// db.collection('Todos').find({completed: false}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2))
	// 	db.close()
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// })

// get count of incomplete todos
	// db.collection('Todos').find({completed: false}).count().then((count) => {
	// 	console.log('Todo Count: ', count);
	// 	db.close()
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// })

// get user with name 'Ori'
	db.collection('Users').find({name: 'Ori'}).toArray().then((docs) => {
		console.log('Users');
		console.log(JSON.stringify(docs, undefined, 2))
		db.close()
	}, (err) => {
		console.log('Unable to fetch todos', err)
	})


	// db.close()
});