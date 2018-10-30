const express = require("express");
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();
app.use(bodyParser.json());
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

//Create new user
app.post('/users', function(req, res){
 //   console.log(req);
/*let newUser = {
    "name": req.body.name,
    "emai": req.body.email,
    "state": req.body.state
}
*/
fs.readFile(outfile, "utf8", function(err, data){
   
if(err){throw err;}
let createUser = JSON.parse(data);

createUser.push(req.body);
console.log(req.body);
fs.writeFile(outfile, JSON.stringify(createUser), function(err){
    if(err){throw err;}
  
    res.sendStatus(200);
})
})
})



app.listen(port, function() {
    console.log('Listening on', port);
  });