const { MongoClient} = require("mongodb");

// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017/todos";

let dbConnection;
module.exports = {
  connectToDb: (cb) =>{
    MongoClient.connect(url)
    .then((client) => {
      dbConnection = client.db()
      return cb();
    })
    .catch(err => {
      console.log(err)
      return cb(err);
    })
  },
  getDb: () => dbConnection
}