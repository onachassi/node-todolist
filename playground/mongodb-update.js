const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err){
		return console.log('Unable to connect to MongoDB server: ', err)
	}
	console.log('Connected to MongoDB server');

	// findOneAndUpdate
	db.collection('Todos')
		.findOneAndUpdate({
			_id: new ObjectID("58f8498ffb92cac0373a68b2")
		},{
			$set: {
				completed: true
			}
		},{
			returnOriginal: false
		}).then((result) => {
			console.log(JSON.stringify(result, undefined, 2))
			db.close()
		})
		
})