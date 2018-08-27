const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const workout = require('./workoutDB')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get('/',(req,res)=>{
    workout.fetchCategory((err,docs)=>{
        res.send(docs)
    })
});

app.post('/add',(req,res)=>{
    var category = req.body
    workout.addCategory(category,(err,docs)=>{
        res.send(docs)
    })
});

app.post('/delete',(req,res)=>{
    var category = req.body
    workout.deleteCategory(category,(err,docs)=>{
        res.send(docs)
    })
});

app.listen(3000,()=>{console.log('Listening on port 3000')})