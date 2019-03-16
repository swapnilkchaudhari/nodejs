// Run with url http://localhost:8080/test?name=Swapnil%20Darsh

var http = require('http');
var url = require('url');
var moduleTest = require('./moduleTest')
//var https=require('https')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html><h1>Hello World!</h1>")
  res.write("<h2>Request Url is "+req.url+"</h2>")
  var q = url.parse(req.url,true).query
  var query=""
  if(typeof q.name !== 'undefined' && q.name !== null) {
    query=q.name
  }
  res.end('<h3> by swapnil</h3><p>' + moduleTest.currentDate()+" "+query+"</p></html>");
}).listen(8080);
