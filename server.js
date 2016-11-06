var http = require('http'),
    fs = require('fs');

const PORT = process.env.PORT || 5000;

var server = http.createServer(function(req, res) {
  var data = resource(req, res)

  res.setHeader('Content-Type', data.mime);
  res.write(data.content);
  res.end();
});

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});

var resource = function(req, res) {
  req.url = req.url == '/' ? 'index.html' : req.url.replace(/^\//, '');

  var content = fs.existsSync(req.url) ? fs.readFileSync(req.url).toString() : '';
  var mime = req.headers['accept'].split(',')[0];

  return {
    content: content,
    mime: mime
  }
}