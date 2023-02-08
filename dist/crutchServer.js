const http = require('http'), fileSystem = require('fs'), path = require('path');

const fileName = "geometry.stl";

http.createServer((request, response) => {
    const filePath = path.join(__dirname, fileName);
    const stat = fileSystem.statSync(filePath);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200, {
        'Content-Type': 'geometry/stl',
        'Content-Length': stat.size
    });
    const readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
    }
).listen(2000);