let fs = require('fs');

exports.read = (req, res) => {
  fs.readFile('./components/3.FileSystem/temp.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
};

exports.write = (req, res) => {
  fs.writeFile('./components/3.FileSystem/newfile.txt', 'Hello content!', function (err) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("Write file successfully!");
  });
};
