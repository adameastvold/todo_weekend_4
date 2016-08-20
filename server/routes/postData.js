var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/ToDo_Weekend';

router.post('/', function(req, res) {
    var item = req.body;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, pg.connect", err, "\n \n \n \n");
        }

        //To manage strings and references cleaner
        var queryString = 'INSERT INTO todo_table (task, status) VALUES ($1, $2)'
        var referenceValues = [item.item_name, item.status];

        console.log(item, item.status);

        client.query(queryString, referenceValues,

            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in POST, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.send(result.rows);
            });
    });
});




module.exports = router;
