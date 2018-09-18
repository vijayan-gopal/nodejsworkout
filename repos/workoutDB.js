const mongoose = require('mongoose');
const workout_category = require('../entity/workoutCategoryModel');

mongoose.connect('mongodb://localhost/workouttracker')

function dbHandler(){
mongoose.connection.on('error',function (res,err) {  
    console.log('Mongoose connection error: ' + err)

})
};

//Add Category
function addCategory(category,callback){
    var wc = new workout_category(category);
    wc.save((err,doc)=>{
    if(err)
    {
        if(err.code == 11000)
        {
            var usr_message = {"message": category.category_name + " already exists in your workout"}                    
        }
        else
        {
            var usr_message = {"message": err.errors.category_name.message}
        }
        callback(err,usr_message);                
    }
    else
    {
        var usr_message = {"message": category.category_name + " added to your workout"}
        callback(err,usr_message);
    }
    })
};

//Delete a category
function deleteCategory(category,callback){
    workout_category.deleteOne(category,(err,res)=>{
    if(err)
    {
        var usr_message = {"message": "Error in deleting " + category.category_name + "from your workout"}
    }
    else 
    {
        var usr_message = {"message":category.category_name + " removed from your workout"}
    }
    callback(err,usr_message);
    })
};

//Select all Cetogries
function fetchCategory(callback){
    var query = workout_category.find({})
    query.exec((err,doc)=>{
        callback(err,doc);
    })
};

module.exports = {fetchCategory,addCategory,deleteCategory,dbHandler}