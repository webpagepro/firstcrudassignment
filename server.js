const express = require("express");
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();
const path = require('path');
const port = process.env.PORT || 8000;

let getAll = []; let getOne = []; let getUser = [];
let outfile = path.join(__dirname+'/storage.json');
console.log(outfile);

/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
*/

//get user
app.get('/users', function(req, res){
fs.readFile(outfile, "utf8", function(err, data){
getUser = JSON.parse(data);

res.json(getUser);
})
});

//get single user
app.get('/users/:name', function(req, res){
fs.readFile(outfile, "utf8", function(err, data){
    if(err){throw err;}

    getOne = JSON.parse(data);
    console.log(data);
for(let i = 0; i < getOne.length; i++){
    if(getOne[i].name === req.params.name){
    return res.json(getOne[i]);
  }  
 }
    res.sendStatus(400);
})

});

app.listen(port, function() {
    console.log('Listening on', port);
  });