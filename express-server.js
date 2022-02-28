const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const PORT = 80;

const app = express();

//Use morgan logging middleware
app.use(logger('dev'));

//Sets up static resource handling middleware
app.use(express.static(path.join(__dirname, "public")));

//Home page (no url route) serves up index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
})

//Custom route
app.get('/secondpage', function(req, res){
    res.sendFile(path.join(__dirname,'secondpage.html'));
})

const server = http.createServer(app);
server.listen(PORT);
console.log(`Express server listening at http://localhost:${PORT}`);