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

	db.collection('Todos').insertOne({
		text: 'Finish weddeliver app',
		completed: false
	},(err, result)=>{
		if(err){
			return console.log('Unable to insert todo', err)
		}

		console.log(JSON.stringify(result.ops, undefined, 2))
	})

	Doc into Users collection (name, age, location)

	db.collection('Users').insertOne({
		name: 'Ori',
		age: 23,
		location: 'Undisclosed Location'
	},(err, result)=>{
		if(err){
			return console.log('Unable to insert todo', err)
		}

		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
	})


	db.close()
});