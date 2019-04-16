var MongoClient = require('mongodb').MongoClient;
const mongoUrl =process.env.db_url;
const db_name=process.env.database;
var connection;
var dbInstance;
MongoClient.connect(mongoUrl, function(err, db) {
    if (err) {
        context.callback(JSON.stringify(err));
        throw err;
    }
    dbInstance = db; 
    connection = db.db(db_name);
});

exports.handler = function(context, event) {

    if( connection && dbInstance){
        var myobj = { name: "Company Inc", address: "Highway 37" };
        connection.collection("customers").insertOne(myobj, function(err, res) {
            if (err) {
                context.callback(JSON.stringify(err));
                throw err;
            }
            context.callback('Saved');
        });
    }else{
        throw "Connection doesn't established!";
    }

};
