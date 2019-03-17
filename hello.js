// Run with url http://localhost:8080/test?name=Swapnil%20Darsh

var http = require('http');
var url = require('url');
var fileSystem= require('fs')
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
  res.write('<h3> by swapnil</h3><p>' + moduleTest.currentDate()+" "+query+"</p>");
  fileSystem.readFile("test.txt",'utf8', function (err,data){
res.write("<p bgcolor=\"#FF0000\">"+data+"</p></html>")
res.end()
})

}).listen(8080);


function readFile(err,data){
  if(err)
    return "Error reading file";
    else{
      return data;
    }
}
