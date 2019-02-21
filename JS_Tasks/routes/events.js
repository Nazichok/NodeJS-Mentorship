const express = require('express');
const router = express.Router();
const eventsPath = './files/events.json';
const fs = require('fs');
const uuid4 = require('uuid/v4');

router.get('/', function (req, res) {
  fs.readFile(eventsPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.get('/:id', function (req, res) {
  fs.readFile(eventsPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      let events = JSON.parse(data);
      let elem = events.find(event => event.id === req.params.id);
      res.json(elem);
    }
  });
});

router.post('/', function (req, res) {
  fs.readFile(eventsPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newData = JSON.parse(data);
      newData.push({id: req.body.id ? req.body.id : uuid4(), name: req.body.name});
      fs.writeFile(eventsPath, JSON.stringify(newData), err => {
        if(err) {
          console.log(err);
        } else {
          res.json(newData);
        }
      });
    }
  });
});


router.delete('/:id', (req, res) => {
  fs.readFile(eventsPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let events = JSON.parse(data);
      let result = events.filter(val => {
        return val.id !== req.params.id;
      });
      res.json(result);
    }
  });
});

module.exports = router;