const mongoose = require('mongoose');
const workout_category = require('./entity/categorymodel');


mongoose.connect('mongodb://localhost/workouttracker');


//Select all Cetogries
function fetchCategory(callback){
var query = workout_category.find({}).select('category_name -_id')
query.exec((err,doc)=>{
    if(err) throw err;
    callback(err,doc);
})
}

//var category = {"category_name":"jogging"}

//Add Category
function addCategory(category,callback){
var wc = new workout_category(category);
var usr_message = {"message": category.category_name + " added to your workout"}
wc.save((err,doc)=>{
    if(err) throw err;
    callback(err,usr_message);
})
}

//Delete a category
function deleteCategory(category,callback){
    var usr_message = {"message":category.category_name + " removed from your workout"}
    workout_category.deleteOne(category,(err,res)=>{
    if(err) throw err;
    callback(err,usr_message);
})
}
//addCategory(category,(err,res)=>{console.log(res.message)})
//fetchCategory((err,res)=>{console.log(res)})
//deleteCategory(category,(err,res)=>{console.log(res.message)})
module.exports = {fetchCategory,addCategory,deleteCategory}