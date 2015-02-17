//globals
var host = "localhost";
var port = 8080;



//setup
var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/taskTracker');

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
});

var taskSchema = mongoose.Schema({
    taskText: String
});

var Task = mongoose.model('Task', taskSchema);

var app = express();

//app config
app.use(cors());

var jsonParser = bodyParser.json();

app.post('/taskTracker/v1/task', jsonParser,  function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var newTask = new Task({taskText: req.body.taskText});

    console.log("Task received: "+req.body.taskText);

    newTask.save(function (err, newTask) {
        if (err){
            res.sendStatus(400);
            return console.error(err);
        }

        console.log("Task saved: "+req.body.taskText);
        res.send("saved")
    });

});

app.get('/taskTracker/v1/me/tasks', jsonParser,  function (req, res) {

    Task.find(function (err, tasks) {
        if (err) return console.error(err);

        console.log(tasks);
        res.send( JSON.stringify(tasks));

    });
});

app.delete('/taskTracker/v1/task', jsonParser,  function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (!req.body.taskText) return res.sendStatus(400);

    var deleteText = req.body.taskText;

    console.log("Deleting task: "+deleteText);

    Task.find({ taskText : deleteText }).remove().exec();

    res.send("task deleted")
});

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});