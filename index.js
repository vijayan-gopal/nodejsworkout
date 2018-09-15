const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser')
const categoryRoutes = require('./routes')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(xmlparser({explicitArray:false}))

app.use(cors());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

categoryRoutes(app);  //create routes

app.listen(3000,()=>{console.log('Listening on port 3000')})