const http = require('http');
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..')
const PORT = 42069;

const mimeTypes = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

http.createServer((request, response) => {
  console.log(`Request: ${request.url}`);

  var filePath = request.url === '/' ? '/index.html' : request.url;

  var extname = String(path.extname(filePath)).toLowerCase();

  var contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(baseDir + filePath, function(error, content) {
    if ( error )  {
      if ( error.code === 'ENOENT' ) {
        console.log(`404 ${filePath}`);
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Invalid file path: ${filePath}\n`, 'utf-8');
      } else {
        console.log(`500 ${filePath}`);
        response.writeHead(500);
        response.end(`Unhandled error: ${error.toString()}\n`, 'utf-8');
      }
    } else {
      console.log(`200 ${filePath}`);
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
