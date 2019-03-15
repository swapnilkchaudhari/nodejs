var http = require('http');
var moduleTest = require('./moduleTest')
//var https=require('https')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html><h1>Hello World!</h1>")
  res.end('<h3> by swapnil</h3><p>' + moduleTest.currentDate()+"</p></html>");
}).listen(8080);