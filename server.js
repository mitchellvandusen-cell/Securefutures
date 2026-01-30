const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 7856;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Serve 404 as the index page
        fs.readFile(path.join(__dirname, 'index.html'), (err404, data404) => {
          if (err404) {
            res.writeHead(500);
            res.end('Internal Server Error');
            return;
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data404);
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Secure Futures Insurance running on port ${PORT}`);
});
