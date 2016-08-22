var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/ToDo_Weekend';

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
            console.log("error in DELETE, pg.connect\n", err, "\n \n \n \n");
        }

        //To manage strings and references cleaner
        var referenceValues = [id];
        var queryString = 'DELETE FROM todo_table WHERE id = $1';

        client.query(queryString, referenceValues,
            function(err, result) {
                done();
                if (err) {
                    console.log("error in DELETE, client.query: ", err, "\n \n \n \n");
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
            });
    });
});


module.exports = router;
