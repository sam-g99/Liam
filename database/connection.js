const { MongoClient } = require('mongodb');

// Connect to the db (setting up later)
MongoClient.connect('', (err, db) => {
  if (err) throw err;
});
