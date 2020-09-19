'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const dns = require('dns');
var bodyParser = require('body-parser')

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 

const links = [];
let id = 0;

app.post("/api/shorturl/new", function (req, res) {
  
 const { url } = req.body;

const noHTTPSurl = url.replace(/^https?:\/\//,'');

 console.log(url)

 //checks if url is valid
 dns.lookup(noHTTPSurl,(err) => {

  if(err) {
    return res.json({
      error:"Invalid URL"
    });
  } else {
id++;

links.push({
  id,
  url
});

return res.json({
  original_url:url,
  short_url: id
})
  }
 });
 
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});