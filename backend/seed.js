import pkg from 'mongodb';
const { MongoClient } = pkg;

var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
    const dBase = db.db('friend-finder')
 if (err) throw err;
    dBase.createCollection('ice_cream_lovers', (err, res) => {
      if (err) throw err;
      console.log('ice_cream_lovers collection created!');
    })
     dBase.collection("ice_cream_lovers").insertMany([
      {"id": 1, "name": "Seth"},
      {"id": 2, "name": "Bob"},
      {"id": 3, "name": "Rodney"},
      {"id": 4, "name": "Alex"},
      {"id": 5, "name": "Jason"},
  ], (err, res) => {
    if (err) throw err
    console.log("Seeded Database!!! You're all clear kid, now lets blow this thing so we can all go home!")

  })
   db.close();
 });