const fs = require('fs');
const eventsPath = './files/events.json';
const discoveriesPath = './files/discoveries.json';
const events = require(eventsPath);
const discoveries = require(discoveriesPath);
const image = './large_image.jpg';
const port = 3050;
const uuid4 = require('uuid/v4');
const compone = require('./object_compone');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/events', function (req, res) {
  fs.readFile(eventsPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
});

app.post('/events', function (req, res) {
  events.push({id: uuid4(), name: req.body.name});
  fs.writeFile(eventsPath, JSON.stringify(events), err => {
    if(err) {
      console.log(err);
    } else {
      res.json(events);
    }
  });
});

app.get('/events/:id', function (req, res) {
  let elem = events.find(event => event.id === req.params.id);
  res.json(elem);
});

app.get('/discoveries', function (req, res) {
  fs.readFile(discoveriesPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
});

app.get('/componed', function (req, res) {
  res.json(compone(events, discoveries));
});

app.get('/image', function (req, res) {
  const img = fs.createReadStream(image);
  img.pipe(res);
});

app.get('*', function (req, res) {
  res.send(`Fuck you ${uuid4()}`);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
