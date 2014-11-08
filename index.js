/**
 * Created by Holden Caulfield on 03.11.2014.
 */
var express = require('express'),
    app = express(),
    CONFIGURATION = require('./server_configuration.json'),
    jade = require('jade'),
    MondoDBClient = require('mongodb').MongoClient,
    MondoDBServer = require('mongodb').Server,
    mongoClient = new MondoDBClient(new MondoDBServer(CONFIGURATION.db.url, CONFIGURATION.db.port, {
        native_parser: true
    })),
    db = mongoClient.db('chess');
/**
 *
 */
app.set('views', __dirname + '/public/templates');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);
app.use(express.static(__dirname + '/public'));
/**
 *
 */
app.get(['/', '/index'], function (req, res) {
    res.render('index.jade');
});
/**
 *
 */
mongoClient.open(function (err, mongoClient) {
    if (err) {
        console.log(err);
    } else {
        app.listen(CONFIGURATION.server.port, CONFIGURATION.server.url);
        console.log('listen on port 80');
    }
});
