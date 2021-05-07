const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 42069;

const mimeTypes = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.jpg': 'image/jpg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

http.createServer(function (request, response) {
  console.log(`Request: ${request.url}`);

  const filePath = `../${request.url}`;
  if (filePath == './') {
    filePath = './index.html';
  }

  var extname = String(path.extname(filePath)).toLowerCase();

  var contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
    if ( error )  {
      if ( error.code === 'ENOENT' ) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Invalid path: ${filePath} ..\n`, 'utf-8');
      }
      else {
        response.writeHead(500);
        response.end(`Unhandled error: ${error.code} ..\n`);
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
