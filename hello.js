// Run with url http://localhost:8080/test?name=Swapnil%20Darsh
//'use strict';
var http = require('http');
var url = require('url');
var fileSystem = require('fs')
var moduleTest = require('./moduleTest')
var CustomObjectModule=require('./customObject')
//var https=require('https')

http.createServer(function (req, res) {
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
  arrayOperation(res)
  testAsyncOperation(res)
  /*var fileName = "test.txt"
  console.log("Saved in 0 " + fileName)
  fileSystem.readFile(fileName, 'utf8', function (err, data) {
    res.write("<p style=\"background-color:#FF0000;\">" + data + "</p></body></html>")
    console.log("Saved in 1 " + fileName)
    fileSystem.appendFile(fileName, '\nappended text', function (err) {
      console.log("Saved in 2 " + fileName)
      if (err)
        throw err
      else
        console.log("Saved in " + fileName)
    })
    res.end()
  })*/

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

function arrayOperation(res){
  res.write('<div style="background-color:powderblue;"><h4>Array operations</h4>')
  var array =[20,91,12,13]
  res.write('<p>Before sorting:'+array.join(', ')+"</p>")
  array.sort(function(a,b){return a-b})
  res.write('<p>After sorting:'+array.join(', ')+"</p></div>")
}

function testAsyncOperation(res){
  res.write('<div style="background-color:#FFFF00;"><h4>Async operations</h4>')
  var list=[1,2,3,4,5,6]
  var result=syncOdds(list)
  res.write('<p>Synchronous odds are:'+result.join(", ")+'</p>')
  
  asyncOdds(list,function(error,data){
    if(error==null){
      res.write('<p>Asynchronous odds are:'+data.join(", ")+'</p>')
    }else{
      res.write('<p>Asynchronous odds error: '+error.message +' data:'+data.join(", ")+'</p>')
    }
    res.write("</div></body></html>")
    res.end()
  })
}

function syncOdds(list){
  return list.filter(function(value){
    return value % 2 !=0
  })
}

function asyncOdds(list,callback){

  setTimeout(function(){
    var result= list.filter(function(value){
      return value % 2 !=0
    })
    var error=null
    if(Math.random()<0.5)
      error=new Error("Randomised error","Randomised error message")
    callback(error,result)
  },2000)
}