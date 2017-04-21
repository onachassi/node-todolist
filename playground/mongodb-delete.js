const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('Unable to connect to MongoDB server: ', err)
	}
	console.log('Connected to MongoDB server');

	// deleteMany
	// db.collection('Users').deleteMany({name: 'Ori'}).then((result) => {
	// 	console.log(result)
	// db.close()
	// })

	// // deleteOne
	// db.collection('Users').deleteOne({name: 'Ori'}).then((result) => {
	// 	console.log(result)
	// db.close()
	// })

	// findOneAndDelete
	// db.collection('Users').findOneAndDelete({name: 'Ori'}).then((result) => {
	// 	console.log(result)
	// 	// db.close()
	// })


})