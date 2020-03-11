var formidable = require('formidable');
var fs = require('fs');

exports.get = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="upload-file" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
}

exports.addUploadFileHandler = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!files || !files.filetoupload) return;

    var oldpath = files.filetoupload && files.filetoupload.path;
    var newpath = './components/6.UploadFile/files/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
}