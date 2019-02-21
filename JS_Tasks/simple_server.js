const fs = require('fs');
const eventsPath = './files/events.json';
const discoveriesPath = './files/discoveries.json';
const image = './large_image.jpg';
const port = 3050;
const uuid4 = require('uuid/v4');
const compone = require('./object_compone');

const express = require('express');
const bodyParser = require('body-parser');

const events = require('./routes/events');
const discoveries = require('./routes/discoveries');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/events', events);
app.use('/discoveries', discoveries);

app.get('/componed', function (req, res) {
  let result = [];
  count = 0;
  fs.readFile(eventsPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      count++;
      result.unshift(JSON.parse(data));
      if (count == 2) {
        res.json(compone(...result));
      }
    }
  });
  fs.readFile(discoveriesPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      count++;
      result.push(JSON.parse(data));
      if (count == 2) {
        res.json(compone(...result));
      }
    }
  });
});

app.get('/image', function (req, res) {
  const img = fs.createReadStream(image);
  img.pipe(res);
});

app.get('*', function (req, res) {
  res.send(`Hello World! UUID4: ${uuid4()}`);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
