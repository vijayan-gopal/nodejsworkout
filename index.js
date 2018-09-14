const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(cors());

categoryRoutes(app);  //create routes

app.listen(3000,()=>{console.log('Listening on port 3000')})