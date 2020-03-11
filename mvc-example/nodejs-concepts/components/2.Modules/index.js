exports.send = (req, res, time) => {
  if (time) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("timestamp: " + JSON.stringify(time));
  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end("No time passed");
  }
};

exports.now = () => {
  return Date.now();
}