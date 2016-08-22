var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/ToDo_Weekend';


router.get('/', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
            console.log("error in GET, pg.connect", err, "\n \n \n \n");
        }

        // Shout out to Drew for having a great idea of storing the query strings for later use!
        var queryStringGET = 'SELECT * FROM todo_table';

        client.query(queryStringGET,
            function(err, result) {
                done(); //closes connection, I only can have ten :(
                if (err) {
                    res.sendStatus(500);
                    console.log("error in GET, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.send(result.rows);
            });
    });
});




module.exports = router;
