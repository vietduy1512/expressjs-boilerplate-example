let fs = require('fs');
var zlib = require('zlib');

exports.readStream = (req, res) => {
  let data = '';
    
  let readerStream = fs.createReadStream('./components/4.Streams/temp.html');
  readerStream.setEncoding('UTF8');

  readerStream.on('data', function(chunk) {
    data += chunk;
  });
  readerStream.on('end',function() {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
  readerStream.on('error', function(err) {
    console.log(err.stack);
  });
};

exports.writeStream = (req, res) => {
  let data = 'Simply Easy Learning';
    
  let writerStream  = fs.createWriteStream('./components/4.Streams/newfile.txt');
  
  writerStream.write(data,'UTF8');
  writerStream.end();

  writerStream.on('finish', function() {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("Write file successfully!");
 });
 writerStream.on('error', function(err) {
    console.log(err.stack);
 });
};

exports.pipingStream = (req, res) => {
  var readerStream = fs.createReadStream('input.txt');
  var writerStream = fs.createWriteStream('output.txt');

  // Pipe the read and write operations
  // read input.txt and write data to output.txt
  readerStream.pipe(writerStream);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("Piping successfully!");
};

exports.chainingStream = (req, res) => {
  // Compress
  fs.createReadStream('input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('compressed.gz'));

  // Decompress
  fs.createReadStream('compressed.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('decompressed.txt'));

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("Piping successfully!");
};