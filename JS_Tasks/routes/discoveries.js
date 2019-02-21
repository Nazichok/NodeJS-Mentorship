const express = require('express');
const router = express.Router();
const discoveriesPath = './files/discoveries.json';
const fs = require('fs');
const uuid4 = require('uuid/v4');

router.get('/', function (req, res) {
  fs.readFile(discoveriesPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
});

router.get('/:id', function (req, res) {
  fs.readFile(discoveriesPath, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      let discoveries = JSON.parse(data);
      let elem = discoveries.find(disc => disc.id === req.params.id);
      res.json(elem);
    }
  });
});

router.post('/', function (req, res) {
  fs.readFile(discoveriesPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newData = JSON.parse(data);
      newData.push({id: req.body.id ? req.body.id : uuid4(), city: req.body.city, venue: req.body.venue});
      fs.writeFile(discoveriesPath, JSON.stringify(newData), err => {
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
  fs.readFile(discoveriesPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let discoveries = JSON.parse(data);
      let result = discoveries.filter(val => {
        return val.id !== req.params.id;
      });
      res.json(result);
    }
  });
});

module.exports = router;