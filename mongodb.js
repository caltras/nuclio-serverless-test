var MongoClient = require('mongodb').MongoClient;
const mongoUrl =process.env.db_url;
const db_name=process.env.database;

exports.handler = function(context, event) {

    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
            context.callback(JSON.stringify(err));
            throw err;
        }
        var dbo = db.db(db_name);
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
            if (err) {
                context.callback(JSON.stringify(err));
                throw err;
            }
            db.close();
            context.callback('Saved');
        });
    });

};
