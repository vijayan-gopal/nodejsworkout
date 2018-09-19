const mongoose = require('mongoose');
const workout_category = require('../entity/workoutCategoryModel');
const workout_collection = require('../entity/workoutCollectionModel');
const workout_active = require('../entity/workoutActiveModel');

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

//Create workout
function addWorkout(workoutDoc,callback){
    workout_category.findOne({"category_name":workoutDoc.category_name},(err,doc)=>{
        console.log("category_doc" + doc)
        //assign category id from workout_category model
        workoutDoc.category_id = doc._id
        //remove category name from input
        delete workoutDoc.category_name
        console.log(workoutDoc)
        var workout = new workout_collection(workoutDoc)
        workout.save((err,doc)=>{
            if(err)
            {
                var usr_message = {"message": "Error in creating workout"}
            }
            else
            {
                var usr_message = {"message": "Workout created successfully"}
            }
            callback(err,usr_message);
        })
    })
};
function updateWorkout(workoutDoc,callback){
    workout_category.findOne({"category_name":workoutDoc.category_name},(err,doc)=>{
        //assign _id from category model to category_id
        workoutDoc.category_id = doc._id
        var old_title = workoutDoc.old_workout_title
        //Remove category name and old workout title from input
        delete workoutDoc.category_name
        delete workoutDoc.old_workout_title
        workout_collection.findOneAndUpdate({"workout_title":old_title},{$set:workoutDoc},(err,res)=>{
            if(err)
            {
                var usr_message = {"message": "Error in updating workout"}
            }
            else
            {
                var usr_message = {"message": "workout updated successfully"}
            }
            callback(err,usr_message);
        })
    })
};
//Remove below commented lines for production
//var workoutDoc = {"workout_title":"test run2","workout_note":"test note","calories_burn_per_min":"0.1","category_id": "","category_name":"running"}
//var workoutDoc = {"old_workout_title":"test update","workout_title":"test update1","workout_note":"test note update","category_id": "","category_name":"walking"}
//updateWorkout(workoutDoc)
//addWorkout(workoutDoc);
//var query = workout_collection.findOne({"workout_title":"test run"})
//            .populate('category_id')
//query.exec((err,doc)=>{console.log(doc.category_id)})

function startWorkoutActive(workoutActiveDoc,callback){
    workout_collection.findOne({"workout_title":workoutActiveDoc.workout_title},(err,doc)=>{
        console.log("workout_collection" + doc)
        //assign category id from workout_category model
        workoutActiveDoc.workout_id = doc._id
        //remove workout title from input
        delete workoutActiveDoc.workout_title
        var workoutActive = new workout_active(workoutActiveDoc)
        workoutActive.save((err,doc)=>{
            if(err)
            {
                var usr_message = {"message": "Error in starting your workout"}
            }
            else
            {
                var usr_message = {"message": "workout started successfully"}
            }
            callback(err,usr_message);
        })
    })
};

function endWorkoutActive(workoutActiveDoc,callback){
    workout_collection.findOne({"workout_title":workoutActiveDoc.workout_title},(err,doc)=>{
        //remove workout title from input
        delete workoutActiveDoc.workout_title
        console.log(workoutActiveDoc)
        workout_active.findOneAndUpdate({"workout_id":doc._id},{$set:workoutActiveDoc},(err,res)=>{
            if(err)
            {
                var usr_message = {"message": "Error in ending workout"}
            }
            else
            {
                var usr_message = {"message": "workout ended successfully"}
            }
            callback(err,usr_message);
        })
    })
};
//Remove below commented lines for production
//var workoutActiveDoc = {"workout_id":"","start_time":"11:10:00","start_date":"09/17/2018","end_date":"","end_time":"","comment":"test","status":"true","workout_title":"test run"}
//var workoutActiveDoc = {"end_date":"09/18/2018","end_time":"19:00:00","comment":"test end","status":"true","workout_title":"test run"}
//startWorkoutActive(workoutActiveDoc)
//endWorkoutActive(workoutActiveDoc)
//var query = workout_active.find({})
//var query = workout_collection.findOne({"workout_title":"test run"})
//            .populate('category_id')
//query.exec((err,doc)=>{console.log(doc)})

//pending: update workout_acive table to end the workout
module.exports = {fetchCategory,addCategory,deleteCategory,dbHandler,addWorkout,updateWorkout,startWorkoutActive,endWorkoutActive}