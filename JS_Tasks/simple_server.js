const http = require('http');
const fs = require('fs');
const events = require('./events.json');
const image = './large_image.jpg';
const port = 3050;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/image') {
    const img = fs.createReadStream(image);
    img.pipe(res);
  } else if (url === '/events') {
    res.end(JSON.stringify(events));
  }
});

server.listen(port, (err) => {
  if (err) {
    return 'Error';
  }

  console.log('listening');
})