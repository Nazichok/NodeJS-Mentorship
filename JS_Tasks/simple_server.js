const http = require('http');
const events = require('./events.json');
const port = 3050;

const server = http.createServer((request, response) => {
  response.end(JSON.stringify(events));
});

server.listen(port, (err) => {
  if (err) {
    return 'Error';
  }

  console.log('listening');
})