var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/ToDo_Weekend';


router.put('/:id', function(req, res) {
    var id = req.params.id;
    var rowValue = req.body;
    var statusValue = rowValue.status;

    console.log('this is the statusValue', statusValue);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, pg.connect", err, "\n \n \n \n");
            res.sendStatus(500);
        }

        //To manage strings and references cleaner
        var queryString = 'UPDATE todo_table SET status = $1 WHERE id = $2';
        var referenceValues = [rowValue.status, id];

        client.query(queryString, referenceValues,

            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    console.log("\n \n \n \n!!!HEY ERROR CONSOLE LOG HERE!!!\n error in PUT, client.query: ", err, "\n \n \n \n");
                    return;
                }
                res.sendStatus(200);

            });

    });

});

module.exports = router;
