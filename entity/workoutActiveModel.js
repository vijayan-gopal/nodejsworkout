const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const activeschema = new Schema({
  workout_id: {type: ObjectId},
  start_time: {type: String},
  start_date: {type: String},
  end_date: {type: String},
  end_time: {type: String},
  comment: {type: String,max: 64},
  status: {type:Boolean}

  
});

const workout_active = mongoose.model('workout_active',activeschema)

module.exports = workout_active