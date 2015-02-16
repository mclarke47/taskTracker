//globals
var host = "localhost";
var port = 8080;

//setup
var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors');

var app = express();

//app config
app.use(cors());

var jsonParser = bodyParser.json();

app.post('/taskTracker/v1/task', jsonParser,  function (req, res) {
    if (!req.body) return res.sendStatus(400);

    console.log("Task saved: "+req.body.taskText)
    res.send("saved")
});

app.get('/taskTracker/v1/me/tasks', jsonParser,  function (req, res) {

    var tempTask = Object();
    tempTask.taskText = "Retrieved Task";
    var tempTask1 = Object();
    tempTask1.taskText = "Other Task";
    var tempTask2 = Object();
    tempTask2.taskText = "Third Task";


    res.send( JSON.stringify([tempTask, tempTask1, tempTask2]))
});

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});