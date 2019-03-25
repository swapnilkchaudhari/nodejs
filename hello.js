// Run with url http://localhost:8080/test?name=Swapnil%20Darsh
//'use strict';
var http = require('http');
var url = require('url');
var fileSystem = require('fs')
var moduleTest = require('./moduleTest')
var CustomObjectModule=require('./customObject')
//var https=require('https')

http.createServer(function (req, res) {
  console.log("Saved in 00 " + fileName)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("<html><body><h1>Hello World!</h1>")
  res.write("<h2>Request Url is " + req.url + "</h2>")
  var q = url.parse(req.url, true).query
  var query = ""
  if (typeof q.name !== 'undefined' && q.name !== null) {
    query = q.name
  }
  res.write('<h3> by swapnil</h3><p>' + moduleTest.currentDate() + " " + query + "</p>");
  showCustomObject(res)
  var fileName = "test.txt"
  console.log("Saved in 0 " + fileName)
  fileSystem.readFile(fileName, 'utf8', function (err, data) {
    res.write("<p bgcolor=\"#FF0000\">" + data + "</p></body></html>")
    console.log("Saved in 1 " + fileName)
    fileSystem.appendFile(fileName, '\nappended text', function (err) {
      console.log("Saved in 2 " + fileName)
      if (err)
        throw err
      else
        console.log("Saved in " + fileName)
    })
    res.end()
  })

}).listen(8080);


function readFile(err, data) {
  if (err)
    return "Error reading file";
  else {
    return data;
  }
}

function showCustomObject(res){
  res.write("CustomObject firstName="+CustomObjectModule.customObject.firstName);
  //res.write("CustomObject firstName="+customObject.firstName);
  res.write("<p>CustomObjectModule lastName="+CustomObjectModule.fullDeatails(CustomObjectModule.customObject)+'</P>');
  //res.write("CustomObject fullName="+CustomObjectModule.customObject.fullName);
}

var customObject= {
  firstName:"Swapnil",
  lastName:"Chaudhari",
  publicationCount:2,
  fullName:function(){
      return firstName +' '+ lastName +' aged '+publicationCount;
  }
};